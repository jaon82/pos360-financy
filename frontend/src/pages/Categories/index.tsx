import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import CategoryForm from './components/CategoryForm';

export default function Categories() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="flex flex-col gap-8 p-12">
      <PageHeader
        title="Categorias"
        description="Organize suas transações por categorias"
        buttonText="Nova categoria"
        onButtonClick={() => setOpenForm(true)}
      />
      <CategoryForm open={openForm} onOpenChange={setOpenForm} />
    </div>
  );
}
