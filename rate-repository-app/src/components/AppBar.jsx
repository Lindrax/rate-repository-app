import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { Link } from 'react-router-native';
import { ScrollView } from 'react-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.grey,

    padding: 10,
  },
  button: {
    padding: 10,
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const { data, loading } = useQuery(ME);

  const handeLogout = () => {
    console.log('logging out');
    authStorage.removeAccessToken();
    client.resetStore();
  };

  if (!loading && data.me) {
    return (
      <View style={styles.container}>
        <ScrollView horizontal>
          <Link to="/">
            <Text color="white" fontSize="subheading" style={styles.button}>
              Repositories
            </Text>
          </Link>
          <Link to="/review">
            <Text color="white" fontSize="subheading" style={styles.button}>
              Review
            </Text>
          </Link>

          <Pressable onPress={handeLogout}>
            <Text color="white" fontSize="subheading" style={styles.button}>
              Sign out
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text color="white" fontSize="subheading" style={styles.button}>
            Repositories
          </Text>
        </Link>

        <Link to="/login">
          <Text color="white" fontSize="subheading" style={styles.button}>
            Sign in
          </Text>
        </Link>

        <Link to="/signup">
          <Text color="white" fontSize="subheading" style={styles.button}>
            Sign up
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
