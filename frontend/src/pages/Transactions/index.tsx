import PageHeader from '@/components/PageHeader';

export default function Transactions() {
  return (
    <div className="flex flex-col gap-8 p-12">
      <PageHeader
        title="Transações"
        description="Gerencie todas as suas transações financeiras"
        buttonText="Nova transação"
      />
    </div>
  );
}
