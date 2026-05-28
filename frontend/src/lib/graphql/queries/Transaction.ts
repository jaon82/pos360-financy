import { gql } from '@apollo/client';

export const LIST_TRANSACTIONS = gql`
  query ListTransactions {
    listTransactions {
      id
      type
      description
      date
      amount
      category {
        title
        icon
        color
      }
    }
  }
`;

export const GET_TRANSACTION = gql`
  query GetTransaction($getTransactionId: String!) {
    getTransaction(id: $getTransactionId) {
      id
      type
      description
      date
      amount
      category {
        title
        icon
        color
      }
    }
  }
`;
