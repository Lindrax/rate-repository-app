import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { Link } from 'react-router-native';
import { ScrollView } from 'react-native-web';

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
      </ScrollView>
    </View>
  );
};

export default AppBar;
