import { gql } from '@apollo/client';

export const LIST_CATEGORIES = gql`
  query ListCategories {
    listCategories {
      id
      title
      description
      icon
      color
      transactions {
        amount
      }
      transactionsCount
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($getCategoryId: String!) {
    getCategory(id: $getCategoryId) {
      id
      title
      description
      icon
      color
    }
  }
`;
