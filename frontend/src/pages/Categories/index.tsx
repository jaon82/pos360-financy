import { useQuery } from '@apollo/client/react';
import { ArrowUpDown, Tag, Utensils } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { LIST_CATEGORIES } from '@/lib/graphql/queries/Category';
import type { Category } from '@/types';
import CategoryCard from './components/CategoryCard';
import CategoryForm from './components/CategoryForm';
import CategorySummaryCard from './components/CategorySummaryCard';

interface ListCategoriesData {
  listCategories: Category[];
}

export default function Categories() {
  const [openForm, setOpenForm] = useState(false);
  const { data, loading, error } =
    useQuery<ListCategoriesData>(LIST_CATEGORIES);

  const categories = data?.listCategories || [];

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Categorias"
        description="Organize suas transações por categorias"
        buttonText="Nova categoria"
        onButtonClick={() => setOpenForm(true)}
      />
      <div className="flex justify-between gap-6">
        <CategorySummaryCard
          icon={Tag}
          iconColor="text-gray-700"
          title="8"
          description="total de categorias"
        />
        <CategorySummaryCard
          icon={ArrowUpDown}
          iconColor="text-purple-base"
          title="27"
          description="total de transações"
        />
        <CategorySummaryCard
          icon={Utensils}
          iconColor="text-blue-base"
          title="Alimentação"
          description="categoria mais utilizada"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      <CategoryForm open={openForm} onOpenChange={setOpenForm} />
    </div>
  );
}
