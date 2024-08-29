import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
  mutation authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`
export const CREATE_REVIEW = gql`
mutation Mutation($review: CreateReviewInput) {
  createReview(review: $review) {
    repositoryId
  }
}
`

export const SIGN_UP = gql`
mutation Mutation($user: CreateUserInput) {
  createUser(user: $user) {
    id
    }
  }
`