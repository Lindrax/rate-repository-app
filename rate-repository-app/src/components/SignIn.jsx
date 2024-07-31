import { Pressable, TextInput, View } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import { StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  box: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    padding: 5,
    margin: 5,
    borderRadius: 4,
    width: 200,
    alignSelf: 'flex-start',
    color: theme.colors.textSecondary,
  },
  submit: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 5,
    flexGrow: 0,
    width: 200,
    margin: 5,
    alignItems: 'center',
    color: 'white',
  },
});

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={styles.box}
      ></TextInput>
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={styles.box}
      ></TextInput>

      <Pressable onPress={formik.handleSubmit} style={styles.submit}>
        <Text>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
