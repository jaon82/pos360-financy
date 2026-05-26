import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail, UserRoundPlus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { toast } from 'sonner';
import z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store/auth';
import Logo from '../assets/logo.svg';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const loginFormSchema = z.object({
    email: z.email(),
    password: z.string(),
  });
  type LoginForm = z.infer<typeof loginFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (formData: LoginForm) => {
    setIsLoading(true);
    try {
      const success = await login(formData);
      if (success) {
        toast.success('Login realizado com sucesso!');
      } else {
        toast.error('Falha ao realizar o login. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error('Ocorreu um erro ao realizar o login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-12 items-center justify-center">
      <img src={Logo} alt="Financy Logo" className="w-33.5 h-8" />
      <Card className="w-full max-w-md ">
        <CardHeader className="justify-center">
          <CardTitle className="flex justify-center items-center font-bold text-xl text-gray-800">
            Fazer login
          </CardTitle>
          <CardDescription className="font-normal text-base text-gray-600">
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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
            </Field>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Checkbox />
                <span className="text-sm text-gray-700">Lembrar-me</span>
              </div>
              <Button variant="link">Recuperar senha</Button>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          <div className="grid grid-cols-[1fr_50px_1fr] items-center mt-6">
            <Separator />
            <span className="text-center text-sm text-gray-500">ou</span>
            <Separator />
          </div>
          <div className="mt-6 text-center text-gray-600">
            Ainda não tem uma conta?
          </div>
          <Link to="/register">
            <Button variant="outline" className="w-full mt-4">
              <UserRoundPlus />
              Criar conta
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
