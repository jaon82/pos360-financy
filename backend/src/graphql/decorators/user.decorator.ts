import { createParameterDecorator, type ResolverData } from 'type-graphql';
import type { User } from '../../../prisma/generated/client';
import { prismaClient } from '../../../prisma/prisma';
import type { GraphQLContext } from '../context';

export const GqlUser = () => {
  return createParameterDecorator(
    async ({ context }: ResolverData<GraphQLContext>): Promise<User | null> => {
      if (!context.user) {
        return null;
      }

      try {
        const user = await prismaClient.user.findUnique({
          where: { id: context.user },
        });

        if (!user) {
          throw new Error('Usuário não encontrado');
        }

        return user;
      } catch {
        throw new Error('Erro ao instanciar o GQLUser');
      }
    },
  );
};
