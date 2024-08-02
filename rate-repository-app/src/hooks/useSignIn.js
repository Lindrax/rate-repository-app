import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage()
  const client = useApolloClient()
  const [authenticate, result] = useMutation(AUTHENTICATE,{
    onError: (error) => {
    const messages = error.graphQLErrors.map(e => e.message).join('\n')
    console.log(messages)
  }
});

  const signIn = async ({ username, password }) => {
    const credentials = {
      "username": username,
      "password": password
    }
    
    const response = await authenticate({variables: {credentials}})
    const token = response.data.authenticate.accessToken
    authStorage.setAccessToken(token)
    console.log(authStorage.getAccessToken())
    client.resetStore()
    return response
  }
  
  return [signIn, result];
};
export default useSignIn