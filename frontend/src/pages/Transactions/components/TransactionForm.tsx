import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export default function TransactionForm({
  open,
  onOpenChange,
}: TransactionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const transactionFormSchema = z.object({
    transactionType: z.enum(['outcome', 'income'], {
      error: (iss) =>
        `Invalid role. Expected 'outcome', 'income', received '${iss.input}'`,
    }),
    description: z.string(),
    date: z.date(),
    amount: z.number().positive('O valor deve ser positivo'),
    category: z.string(),
  });
  type TransactionForm = z.infer<typeof transactionFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionForm>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      transactionType: 'outcome',
      amount: 0,
      category: 'a',
    },
  });

  const onSubmit = async (formData: TransactionForm) => {
    console.log(formData);
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
          <RadioGroup className="max-w-sm" {...register('transactionType')}>
            <FieldLabel htmlFor="type-outcome">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Despesa</FieldTitle>
                  <FieldDescription>
                    For individuals and small teams.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="outcome" id="type-outcome" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="type-income">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Receita</FieldTitle>
                  <FieldDescription>For growing businesses.</FieldDescription>
                </FieldContent>
                <RadioGroupItem value="income" id="type-income" />
              </Field>
            </FieldLabel>
          </RadioGroup>
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
            {/*
            <Field>
              <FieldLabel htmlFor="name">Label</FieldLabel>
              <Select items={items}>
                <SelectTrigger className="w-[180px]">
                  <Mail className="text-gray-800" />
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            */}
          </div>
          <div>
            {
              //Show whatever error message is in the zod schema validation for each field, if there are any
              Object.entries(errors).map(([fieldName, error]) => (
                <p key={fieldName} className="text-sm text-danger">
                  {fieldName}: {error.message}
                </p>
              ))
            }
          </div>
          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
