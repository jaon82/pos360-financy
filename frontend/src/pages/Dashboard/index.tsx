import { useQuery } from '@apollo/client/react';
import { CircleArrowDown, CircleArrowUp, Wallet } from 'lucide-react';
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/Transaction';
import type { Transaction } from '@/types';
import CategoriesSummaryTable from './components/CategoriesSummaryTable';
import DashboardSummaryCard from './components/DashboardSummaryCard';
import RecentTransactionsTable from './components/RecentTransactionsTable';

interface ListTransactionsData {
  listTransactions: Transaction[];
}

export default function Dashboard() {
  const { data, loading } = useQuery<ListTransactionsData>(LIST_TRANSACTIONS);
  const transactions = data?.listTransactions || [];

  const balance = transactions.reduce((total, transaction) => {
    return transaction.type === 'income'
      ? total + transaction.amount
      : total - transaction.amount;
  }, 0);

  const incomes = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const outcomes = transactions
    .filter((transaction) => transaction.type === 'outcome')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balanceFormatted = balance.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const incomesFormatted = incomes.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const outcomesFormatted = outcomes.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-6">
        <DashboardSummaryCard
          icon={Wallet}
          iconColor="text-purple-base"
          title={balanceFormatted}
          description="Saldo total"
        />
        <DashboardSummaryCard
          icon={CircleArrowUp}
          iconColor="text-green-base"
          title={incomesFormatted}
          description="Receitas do mês"
        />
        <DashboardSummaryCard
          icon={CircleArrowDown}
          iconColor="text-red-base"
          title={outcomesFormatted}
          description="Despesas do mês"
        />
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-6">
        <RecentTransactionsTable />
        <CategoriesSummaryTable />
      </div>
    </div>
  );
}
