import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { buildContext } from './graphql/context';
import { AuthResolver } from './resolvers/auth.resolver';
import { CategoryResolver } from './resolvers/category.resolver';
import { UserResolver } from './resolvers/user.resolver';

async function startServer() {
  const app = express();
  const schema = await buildSchema({
    resolvers: [AuthResolver, UserResolver, CategoryResolver],
    validate: false,
    emitSchemaFile: './schema.graphql',
  });
  const server = new ApolloServer({
    schema,
  });
  await server.start();

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: buildContext,
    }),
  );

  app.listen(
    {
      port: 4000,
    },
    () => {
      console.log('Servidor iniciado na porta 4000');
    },
  );
}

startServer();
