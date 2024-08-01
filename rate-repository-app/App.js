import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';
import { NativeRouter } from 'react-router-native';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';

const apollOClient = createApolloClient()

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apollOClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;