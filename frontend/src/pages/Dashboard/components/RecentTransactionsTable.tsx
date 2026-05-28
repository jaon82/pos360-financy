import { useQuery } from '@apollo/client/react';
import { ChevronRight, Plus } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { useState } from 'react';
import { Link } from 'react-router';
import TransactionTypeIndicator from '@/components/TransactionType';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/Transaction';
import TransactionForm from '@/pages/Transactions/components/TransactionForm';
import type { Transaction } from '@/types';

interface ListTransactionsData {
  listTransactions: Transaction[];
}

export default function RecentTransactionsTable() {
  const [openForm, setOpenForm] = useState(false);

  const { data: transactionsResponse } =
    useQuery<ListTransactionsData>(LIST_TRANSACTIONS);
  const transactions = transactionsResponse?.listTransactions.slice(0, 5) || [];

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

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2} className="uppercase">
              Transações recentes
            </TableHead>
            <TableHead className="text-right">
              <Link to="/transactions">
                <Button variant="link" className="text-sm">
                  Ver todas
                  <ChevronRight size={16} />
                </Button>
              </Link>
            </TableHead>
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
                <div className="flex flex-col items-start">
                  <span className="font-medium text-base text-gray-800">
                    {transaction.description}
                  </span>
                  <span className="text-gray-600 text-center">
                    {formatDate(transaction.date)}
                  </span>
                </div>
              </TableCell>
              <TableCell className="w-40 text-center">
                <Badge
                  className={`${getBgColor(transaction.category.color)} ${getTextColor(transaction.category.color)}`}
                >
                  {transaction.category.title}
                </Badge>
              </TableCell>
              <TableCell className="w-40 font-semibold text-gray-800">
                <div className="flex justify-end items-center gap-2">
                  <div>
                    {transaction.type === 'outcome' ? '-' : '+'}
                    {formatAmount(transaction.amount)}
                  </div>
                  <TransactionTypeIndicator
                    type={transaction.type}
                    variant="icon"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              <Button variant="link" onClick={() => setOpenForm(true)}>
                <Plus size={20} />
                Nova transação
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <TransactionForm open={openForm} onOpenChange={setOpenForm} />
    </>
  );
}
