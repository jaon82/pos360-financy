import { useQuery } from '@apollo/client/react';
import { Search } from 'lucide-react';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
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
    const month = date.toLocaleDateString('pt-BR', { month: 'long' });
    const year = date.getFullYear();
    const label = `${month.charAt(0).toUpperCase() + month.slice(1)} / ${year}`;
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
    <div className="flex items-center gap-4 px-6 py-4 rounded-xl border border-gray-200 bg-white">
      <Field>
        <FieldLabel>Buscar</FieldLabel>
        <Input
          type="text"
          icon={Search}
          placeholder="Buscar transação..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          className="h-5 w-full min-w-0 bg-transparent outline-none text-base placeholder:text-gray-500 text-gray-800"
        />
      </Field>

      <Field>
        <FieldLabel>Tipo</FieldLabel>
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
      </Field>

      <Field>
        <FieldLabel>Categoria</FieldLabel>
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
      </Field>
      <Field>
        <FieldLabel>Período</FieldLabel>
        <Select
          value={filters.monthYear || undefined}
          onValueChange={(value) => handleChange('monthYear', value ?? '')}
        >
          <SelectTrigger className="min-w-44">
            <SelectValue placeholder="Período" />
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
      </Field>
    </div>
  );
}
