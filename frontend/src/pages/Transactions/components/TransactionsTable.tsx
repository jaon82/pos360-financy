import { useMutation, useQuery } from '@apollo/client/react';
import { SquarePen, Trash } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { useState } from 'react';
import { toast } from 'sonner';
import TransactionTypeIndicator from '@/components/TransactionType';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DELETE_TRANSACTION } from '@/lib/graphql/mutations/Transaction';
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/Transaction';
import type { Transaction } from '@/types';
import TransactionsFilter, {
  type TransactionFilters,
} from './TransactionsFilter';

interface ListTransactionsData {
  listTransactions: Transaction[];
}
interface TransactionsTableProps {
  onEdit: (id: string) => void;
}

export default function TransactionsTable({ onEdit }: TransactionsTableProps) {
  const [filters, setFilters] = useState<TransactionFilters>({
    search: '',
    type: '',
    categoryId: '',
    monthYear: '',
  });

  const { data: transactionsResponse } =
    useQuery<ListTransactionsData>(LIST_TRANSACTIONS);
  const allTransactions = transactionsResponse?.listTransactions || [];

  const transactions = allTransactions.filter((transaction) => {
    if (filters.search) {
      const search = filters.search.toLowerCase();
      if (!transaction.description?.toLowerCase().includes(search))
        return false;
    }
    if (filters.type && filters.type !== 'all') {
      if (transaction.type !== filters.type) return false;
    }
    if (filters.categoryId && filters.categoryId !== 'all') {
      if (transaction.category.id !== filters.categoryId) return false;
    }
    if (filters.monthYear && filters.monthYear !== 'all') {
      const [year, month] = filters.monthYear.split('-').map(Number);
      const date = new Date(transaction.date);
      if (date.getUTCFullYear() !== year || date.getUTCMonth() + 1 !== month)
        return false;
    }
    return true;
  });

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    onCompleted: () => {
      toast.success('Transação removida com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao remover transação:', error);
      toast.error(
        error.message ||
          'Erro ao remover transação. Por favor, tente novamente.',
      );
    },
    refetchQueries: [LIST_TRANSACTIONS],
  });

  const getBgColor = (color: string) => {
    return `bg-${color}-light`;
  };
  const getIconColor = (color: string) => {
    return `text-${color}-base`;
  };
  const getTextColor = (color: string) => {
    return `text-${color}-dark`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      timeZone: 'UTC',
    });
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleDeleteTransaction = (id: string) => {
    deleteTransaction({ variables: { deleteTransactionId: id } });
  };

  return (
    <div className="flex flex-col gap-4">
      <TransactionsFilter filters={filters} onFiltersChange={setFilters} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-center">Data</TableHead>
            <TableHead className="text-center">Categoria</TableHead>
            <TableHead className="text-center">Tipo</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="flex items-center gap-4">
                <div
                  className={`flex justify-center items-center w-10 h-10 rounded-lg ${getBgColor(transaction.category.color)}`}
                >
                  <DynamicIcon
                    name={transaction.category.icon}
                    className={`w-4 h-4 ${getIconColor(transaction.category.color)}`}
                  />
                </div>
                <span className="font-medium text-base text-gray-800">
                  {transaction.description}
                </span>
              </TableCell>
              <TableCell className="text-gray-600 text-center">
                {formatDate(transaction.date)}
              </TableCell>
              <TableCell className="flex justify-center">
                <Badge
                  className={`${getBgColor(transaction.category.color)} ${getTextColor(transaction.category.color)}`}
                >
                  {transaction.category.title}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <TransactionTypeIndicator type={transaction.type} />
                </div>
              </TableCell>
              <TableCell className="font-semibold text-gray-800 text-right">
                {transaction.type === 'outcome' ? '-' : ''}
                {formatAmount(transaction.amount)}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDeleteTransaction(transaction.id)}
                >
                  <Trash className="w-4 h-4 text-danger" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(transaction.id)}
                >
                  <SquarePen className="w-4 h-4 text-gray-700" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
