import { useQuery } from '@apollo/client/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
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
import { LIST_CATEGORIES } from '@/lib/graphql/queries/Category';
import type { Category } from '@/types';

interface ListCategoriesData {
  listCategories: Category[];
}

export default function CategoriesSummaryTable() {
  const { data } = useQuery<ListCategoriesData>(LIST_CATEGORIES);
  const categories = data?.listCategories || [];

  const getBgColor = (color: string) => {
    return `bg-${color}-light`;
  };
  const getTextColor = (color: string) => {
    return `text-${color}-dark`;
  };

  const getCategoryTotalAmount = (category: Category) => {
    return (
      category.transactions?.reduce((total, transaction) => {
        return transaction.type === 'income'
          ? total + transaction.amount
          : total - transaction.amount;
      }, 0) || 0
    );
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={2} className="uppercase">
            Categorias
          </TableHead>
          <TableHead className="text-right">
            <Link to="/categories">
              <Button variant={'link'} className="text-sm">
                Gerenciar
                <ChevronRight size={16} />
              </Button>
            </Link>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>
              <Badge
                className={`${getBgColor(category.color)} ${getTextColor(category.color)}`}
              >
                {category.title}
              </Badge>
            </TableCell>
            <TableCell className="text-sm text-gray-600 text-right px-0">
              {category.transactionsCount ?? 0} itens
            </TableCell>
            <TableCell className="font-semibold text-sm text-gray-800 text-right pl-0">
              {formatAmount(getCategoryTotalAmount(category))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
