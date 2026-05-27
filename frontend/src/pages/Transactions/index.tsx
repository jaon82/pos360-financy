import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import TransactionForm from './components/TransactionForm';

export default function Transactions() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="flex flex-col gap-8 p-12">
      <PageHeader
        title="Transações"
        description="Gerencie todas as suas transações financeiras"
        buttonText="Nova transação"
        onButtonClick={() => setOpenForm(true)}
      />
      <TransactionForm open={openForm} onOpenChange={setOpenForm} />
    </div>
  );
}
