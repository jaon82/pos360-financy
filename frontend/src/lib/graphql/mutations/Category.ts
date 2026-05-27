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
export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $updateCategoryId: String!
    $data: UpdateCategoryInput!
  ) {
    updateCategory(id: $updateCategoryId, data: $data) {
      id
      title
      description
      icon
      color
    }
  }
`;
