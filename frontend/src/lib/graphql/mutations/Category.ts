import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CategoryInput!) {
    createCategory(data: $data) {
      id
      title
      description
      icon
      color
      author {
        id
        name
        email
      }
    }
  }
`;
