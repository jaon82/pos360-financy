import { gql } from '@apollo/client';

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: TransactionInput!) {
    createTransaction(data: $data) {
      id
      type
      description
      amount
      category {
        id
        title
      }
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $updateTransactionId: String!
    $data: UpdateTransactionInput!
  ) {
    updateTransaction(id: $updateTransactionId, data: $data) {
      id
      type
      description
      date
      amount
      category {
        id
        title
      }
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($deleteTransactionId: String!) {
    deleteTransaction(id: $deleteTransactionId)
  }
`;
