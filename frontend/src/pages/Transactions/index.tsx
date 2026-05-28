import { useEffect, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import TransactionEditForm from './components/TransactionEditForm';
import TransactionForm from './components/TransactionForm';
import TransactionsTable from './components/TransactionsTable';

export default function Transactions() {
  const [openForm, setOpenForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | undefined
  >();

  const handleOpenNewForm = () => {
    setSelectedTransactionId(undefined);
    setOpenForm(true);
  };

  const handleEditTransaction = (id: string) => {
    setSelectedTransactionId(id);
    setOpenEditForm(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Transações"
        description="Gerencie todas as suas transações financeiras"
        buttonText="Nova transação"
        onButtonClick={handleOpenNewForm}
      />
      <TransactionsTable onEdit={(id) => handleEditTransaction(id)} />
      <TransactionForm open={openForm} onOpenChange={setOpenForm} />
      <TransactionEditForm
        open={openEditForm}
        onOpenChange={setOpenEditForm}
        id={selectedTransactionId}
      />
    </div>
  );
}
