import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
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
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CREATE_CATEGORY } from '@/lib/graphql/mutations/Category';
import { cn } from '@/lib/utils';

interface IconOptioms {
  value: IconName;
}

interface CategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CategoryForm({
  open,
  onOpenChange,
}: CategoryFormProps) {
  const iconsOptions: IconOptioms[] = [
    { value: 'briefcase-business' },
    { value: 'car-front' },
    { value: 'heart-pulse' },
    { value: 'piggy-bank' },
    { value: 'shopping-cart' },
    { value: 'ticket' },
    { value: 'tool-case' },
    { value: 'utensils' },
    { value: 'paw-print' },
    { value: 'house' },
    { value: 'gift' },
    { value: 'dumbbell' },
    { value: 'book-open' },
    { value: 'baggage-claim' },
    { value: 'mailbox' },
    { value: 'receipt-text' },
  ];
  const colorOptions = [
    { value: 'green', bgColor: 'bg-green-base' },
    { value: 'blue', bgColor: 'bg-blue-base' },
    { value: 'purple', bgColor: 'bg-purple-base' },
    { value: 'pink', bgColor: 'bg-pink-base' },
    { value: 'red', bgColor: 'bg-red-base' },
    { value: 'orange', bgColor: 'bg-orange-base' },
    { value: 'yellow', bgColor: 'bg-yellow-base' },
  ];
  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
    onCompleted: () => {
      toast.success('Categoria criada com sucesso!');
      reset();
      onOpenChange(false);
    },
    onError: (error) => {
      console.error('Erro ao criar categoria:', error);
      toast.error(
        error.message || 'Erro ao criar categoria. Por favor, tente novamente.',
      );
    },
  });

  const categoryFormSchema = z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    color: z.string(),
  });
  type CategoryForm = z.infer<typeof categoryFormSchema>;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryForm>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: '',
      description: '',
      icon: '',
      color: '',
    },
  });

  const onSubmit = async (formData: CategoryForm) => {
    try {
      await createCategory({ variables: { data: formData } });
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
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
          <DialogTitle>Nova categoria</DialogTitle>
          <DialogDescription>
            Organize suas transações com categorias
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Field>
            <FieldLabel htmlFor="title">Título</FieldLabel>
            <Input
              id="title"
              placeholder="Ex. Alimentação"
              {...register('title')}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Descrição</FieldLabel>
            <Input
              id="description"
              placeholder="Descrição da categoria"
              {...register('description')}
            />
            <FieldDescription>Opcional</FieldDescription>
          </Field>
          <Controller
            name="icon"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Ícone</FieldLabel>
                <RadioGroup className="grid grid-cols-8" {...field}>
                  {iconsOptions.map((icon) => (
                    <Field
                      key={icon.value}
                      className={cn(
                        'relative flex justify-center items-center w-10.5 h-10.5 rounded-lg border border-gray-300 text-gray-500',
                        'has-data-checked:border-green-base has-data-checked:text-gray-600',
                      )}
                    >
                      <DynamicIcon name={icon.value} size={20} />
                      <RadioGroupItem
                        value={icon.value}
                        className="absolute top-0 left-0 w-full h-full opacity-0"
                      />
                    </Field>
                  ))}
                </RadioGroup>
              </Field>
            )}
          />

          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Cor</FieldLabel>
                <RadioGroup className="grid grid-cols-7" {...field}>
                  {colorOptions.map((colorOption) => (
                    <Field
                      key={colorOption.value}
                      className={cn(
                        'relative flex justify-center items-center w-12.5 h-7.5 rounded-lg border border-gray-300 text-gray-500',
                        'has-data-checked:border-green-base has-data-checked:text-gray-600',
                      )}
                    >
                      <div
                        className={`w-10! h-5 rounded-sm border ${colorOption.bgColor}`}
                      ></div>
                      <RadioGroupItem
                        value={colorOption.value}
                        className="absolute top-0 left-0 w-full h-full opacity-0"
                      />
                    </Field>
                  ))}
                </RadioGroup>
              </Field>
            )}
          />
          <Button type="submit" disabled={loading}>
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
