import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, LogIn, Mail, UserRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Logo from '../assets/logo.svg';

export default function Register() {
  const registerFormSchema = z.object({
    name: z.string(),
    email: z.email('Digite um e-mail válido'),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
  });
  type RegisterForm = z.infer<typeof registerFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = (data: RegisterForm) => console.log(data);

  return (
    <div className="flex flex-col gap-8 p-12 items-center justify-center">
      <img src={Logo} alt="Financy Logo" className="w-33.5 h-8" />
      <Card className="w-full max-w-md">
        <CardHeader className="justify-center">
          <CardTitle className="flex justify-center items-center font-bold text-xl text-gray-800">
            Criar conta
          </CardTitle>
          <CardDescription className="font-normal text-base text-gray-600">
            Comece a controlar suas finanças ainda hoje
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Field>
              <FieldLabel htmlFor="name">Nome completo</FieldLabel>
              <Input
                id="name"
                placeholder="Seu nome completo"
                icon={UserRound}
                {...register('name')}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">E-mail</FieldLabel>
              <Input
                id="email"
                placeholder="mail@exemplo.com"
                icon={Mail}
                {...register('email')}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                icon={Lock}
                {...register('password')}
              />
              <FieldDescription>
                A senha deve ter no mínimo 8 caracteres
              </FieldDescription>
            </Field>
            <Button type="submit">Cadastrar</Button>
          </form>
          <div className="grid grid-cols-[1fr_50px_1fr] items-center mt-6">
            <Separator />
            <span className="text-center text-sm text-gray-500">ou</span>
            <Separator />
          </div>
          <div className="mt-6 text-center text-gray-600">
            Já tem uma conta?
          </div>
          <Link to="/login">
            <Button variant="outline" className="w-full mt-4">
              <LogIn />
              Fazer login
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
