import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query Query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String ) {
 repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          fullName
          description
          language
          ownerAvatarUrl
          stargazersCount
          forksCount
          ratingAverage
          reviewCount 
        }
      }
    }
}
`

export const ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
              }
            
          }
        }
      }
    }
  }
`

export const BLOG = gql`
  query Query($repositoryId: ID!) {
  repository(id: $repositoryId) {
    id
    fullName
    description
    language
    ownerAvatarUrl
    stargazersCount
    forksCount
    ratingAverage
    reviewCount
    url
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
            }
          }
        }
      }   
    }
  }
` 

export const REVIEWS = gql`
query Query($repositoryId: ID!) {
  repository(id: $repositoryId) {
    id
    fullName
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`