import { useMutation, useQuery } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleArrowDown, CircleArrowUp } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CREATE_TRANSACTION } from '@/lib/graphql/mutations/Transaction';
import { LIST_CATEGORIES } from '@/lib/graphql/queries/Category';
import { cn } from '@/lib/utils';
import type { Category } from '@/types';

interface ListCategoriesData {
  listCategories: Category[];
}

interface TransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export default function TransactionForm({
  open,
  onOpenChange,
}: TransactionFormProps) {
  const transactionFormSchema = z.object({
    type: z.enum(['outcome', 'income'], {
      error: (iss) =>
        `Invalid role. Expected 'outcome', 'income', received '${iss.input}'`,
    }),
    description: z.string(),
    date: z.date(),
    amount: z.number().positive('O valor deve ser positivo'),
    categoryId: z.string().nonempty('A categoria é obrigatória'),
  });
  type TransactionForm = z.infer<typeof transactionFormSchema>;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<TransactionForm>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: 'outcome',
      description: '',
      date: undefined,
      amount: undefined,
      categoryId: '',
    },
  });

  const { data: categoriesResponse } =
    useQuery<ListCategoriesData>(LIST_CATEGORIES);
  const categoriesOptions =
    categoriesResponse?.listCategories.map((category) => ({
      label: category.title,
      value: category.id,
    })) || [];

  const [createTransaction, { loading: isCreating }] = useMutation(
    CREATE_TRANSACTION,
    {
      onCompleted: () => {
        toast.success('Transação criada com sucesso!');
        reset();
        onOpenChange(false);
      },
      onError: (error) => {
        console.error('Erro ao criar transação:', error);
        toast.error(
          error.message ||
            'Erro ao criar transação. Por favor, tente novamente.',
        );
      },
    },
  );

  const onSubmit = async (formData: TransactionForm) => {
    createTransaction({
      variables: {
        data: formData,
      },
    });
  };

  const handleToggleForm = (open: boolean) => {
    if (!open) {
      reset();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleToggleForm}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova transação</DialogTitle>
          <DialogDescription>Registre sua despesa ou receita</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Field>
                <RadioGroup
                  className="grid grid-cols-2 p-2 rounded-xl border border-gray-200"
                  {...field}
                >
                  <Field
                    className={cn(
                      'group/type relative flex justify-center items-center p-0 rounded-lg bg-gray-100 border border-transparent',
                      'has-data-checked:border-red-base',
                    )}
                  >
                    <Button variant="outline" size="default">
                      <CircleArrowDown className="text-gray-400 group-has-data-checked/type:text-red-base" />
                      <span className="text-gray-600 group-has-data-checked/type:text-gray-800">
                        Despesa
                      </span>
                    </Button>
                    <RadioGroupItem
                      value="outcome"
                      className="absolute top-0 left-0 w-full h-full opacity-0"
                    />
                  </Field>
                  <Field
                    className={cn(
                      'group/type relative flex justify-center items-center p-0 rounded-lg bg-gray-100 border border-transparent',
                      'has-data-checked:border-green-base',
                    )}
                  >
                    <Button variant="outline" size="default">
                      <CircleArrowUp className="text-gray-400 group-has-data-checked/type:text-green-base" />
                      <span className="text-gray-600 group-has-data-checked/type:text-gray-800">
                        Receita
                      </span>
                    </Button>
                    <RadioGroupItem
                      value="income"
                      className="absolute top-0 left-0 w-full h-full opacity-0"
                    />
                  </Field>
                </RadioGroup>
              </Field>
            )}
          />
          <Field>
            <FieldLabel htmlFor="description">Descrição</FieldLabel>
            <Input
              id="description"
              placeholder="Ex. Almoço no restaurante"
              {...register('description')}
            />
          </Field>
          <div className="flex justify-between items-center gap-4">
            <Field>
              <FieldLabel htmlFor="date">Data</FieldLabel>
              <Input
                id="date"
                type="date"
                placeholder="Ex. 01/01/2024"
                {...register('date', {
                  valueAsDate: true,
                })}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="amount">Valor</FieldLabel>
              <Input
                id="amount"
                type="number"
                prefix="R$"
                placeholder="0,00"
                {...register('amount', {
                  valueAsNumber: true,
                })}
              />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="transaction-category">Categoria</FieldLabel>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  id="transaction-category"
                  items={categoriesOptions}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categoriesOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <div>
            {
              //Show whatever error message is in the zod schema validation for each field, if there are any
              Object.entries(errors).map(([fieldName, error]) => (
                <p key={fieldName} className="text-sm text-danger">
                  {error.message}
                </p>
              ))
            }
          </div>
          <Button type="submit" disabled={isCreating || !isValid}>
            {isCreating ? 'Salvando...' : 'Salvar'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
