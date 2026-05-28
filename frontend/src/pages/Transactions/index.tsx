import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import TransactionForm from './components/TransactionForm';
import TransactionsTable from './components/TransactionsTable';

export default function Transactions() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Transações"
        description="Gerencie todas as suas transações financeiras"
        buttonText="Nova transação"
        onButtonClick={() => setOpenForm(true)}
      />
      <TransactionsTable />
      <TransactionForm open={openForm} onOpenChange={setOpenForm} />
    </div>
  );
}
