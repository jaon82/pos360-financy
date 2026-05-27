import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter } from 'react-router';
import { Layout } from './components/layout/Layout';
import { apolloClient } from './lib/graphql/apollo';
import AppRoutes from './routes';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
