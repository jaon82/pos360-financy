import { useMutation, useQuery } from '@apollo/client/react';
import { ArrowUpDown, Tag, Utensils } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import PageHeader from '@/components/PageHeader';
import { DELETE_CATEGORY } from '@/lib/graphql/mutations/Category';
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
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(undefined);

  const { data, loading, error } =
    useQuery<ListCategoriesData>(LIST_CATEGORIES);

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    onCompleted: () => {
      toast.success('Categoria removida com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao remover categoria:', error);
      toast.error(
        error.message ||
          'Erro ao remover categoria. Por favor, tente novamente.',
      );
    },
    refetchQueries: [LIST_CATEGORIES],
  });

  const categories = data?.listCategories || [];

  const categoriesCount = categories.length;
  const transactionsCount = categories.reduce(
    (total, category) => total + (category.transactionsCount || 0),
    0,
  );
  const mostUsedCategory = categories.reduce(
    (mostUsed, category) => {
      if (
        !mostUsed ||
        (category.transactionsCount || 0) > (mostUsed.transactionsCount || 0)
      ) {
        return category;
      }
      return mostUsed;
    },
    undefined as Category | undefined,
  );

  const handleEditCategory = (id: string) => {
    setSelectedCategoryId(id);
    setOpenForm(true);
  };

  const handleDeleteCategory = (id: string) => {
    deleteCategory({ variables: { deleteCategoryId: id } });
  };

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
          title={categoriesCount.toString()}
          description="total de categorias"
        />
        <CategorySummaryCard
          icon={ArrowUpDown}
          iconColor="text-purple-base"
          title={transactionsCount.toString()}
          description="total de transações"
        />
        <CategorySummaryCard
          icon={Utensils}
          iconColor="text-blue-base"
          title={mostUsedCategory?.title || 'N/A'}
          description="categoria mais utilizada"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={() => handleEditCategory(category.id)}
            onDelete={() => handleDeleteCategory(category.id)}
          />
        ))}
      </div>
      <CategoryForm
        open={openForm}
        onOpenChange={setOpenForm}
        id={selectedCategoryId}
      />
    </div>
  );
}
