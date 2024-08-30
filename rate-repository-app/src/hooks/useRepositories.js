import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ( orderby, direction, filter) => {


  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy: orderby,
      orderDirection: direction,
      searchKeyword: filter
    },
  
    
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
    }
  })

  const repositories = data
    ? data.repositories
    : null

  
  return { repositories, loading, refetch };
};

export default useRepositories;