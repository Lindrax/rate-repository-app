import { Pressable, TextInput, View } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import { StyleSheet } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';

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
  error: {
    borderColor: 'red',
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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'username must be longer or equal to 1')
    .required('username is required'),
  password: yup
    .string()
    .min(1, 'password must be longer or equal to 1')
    .required('password is required'),
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
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[styles.box, formik.errors.username ? styles.error : null]}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}

      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={[styles.box, formik.errors.password ? styles.error : null]}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}

      <Pressable onPress={formik.handleSubmit} style={styles.submit}>
        <Text>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
