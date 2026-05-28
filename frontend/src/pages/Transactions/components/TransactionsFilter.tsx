import { useQuery } from '@apollo/client/react';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LIST_CATEGORIES } from '@/lib/graphql/queries/Category';
import type { Category } from '@/types';

interface ListCategoriesData {
  listCategories: Category[];
}

export interface TransactionFilters {
  search: string;
  type: string;
  categoryId: string;
  monthYear: string;
}

interface TransactionsFilterProps {
  filters: TransactionFilters;
  onFiltersChange: (filters: TransactionFilters) => void;
}

function generateMonthYearOptions() {
  const options: { label: string; value: string }[] = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const label = date.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    });
    options.push({ label, value });
  }
  return options;
}

const monthYearOptions = generateMonthYearOptions();

export default function TransactionsFilter({
  filters,
  onFiltersChange,
}: TransactionsFilterProps) {
  const { data: categoriesResponse } =
    useQuery<ListCategoriesData>(LIST_CATEGORIES);
  const categories = categoriesResponse?.listCategories || [];

  const handleChange = <K extends keyof TransactionFilters>(
    key: K,
    value: TransactionFilters[K],
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-3 py-3.5 px-3 rounded-lg border border-gray-300 bg-white flex-1 min-w-48">
        <Search size={16} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Buscar transação..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          className="h-5 w-full min-w-0 bg-transparent outline-none text-base placeholder:text-gray-500 text-gray-800"
        />
      </div>

      <Select
        value={filters.type || undefined}
        onValueChange={(value) => handleChange('type', value ?? '')}
      >
        <SelectTrigger className="min-w-40">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="income">Receita</SelectItem>
            <SelectItem value="outcome">Despesa</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={filters.categoryId || undefined}
        onValueChange={(value) => handleChange('categoryId', value ?? '')}
      >
        <SelectTrigger className="min-w-44">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">Todas</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={filters.monthYear || undefined}
        onValueChange={(value) => handleChange('monthYear', value ?? '')}
      >
        <SelectTrigger className="min-w-44">
          <SelectValue placeholder="Mês/Ano" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">Todos</SelectItem>
            {monthYearOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
