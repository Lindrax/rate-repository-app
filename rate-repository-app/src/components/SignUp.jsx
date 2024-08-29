import React from 'react';
import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import { SIGN_UP } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

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
    .min(5, 'username must be longer or equal to 5')
    .max(30, 'username must be shorter than 30')
    .required('username is required'),
  password: yup
    .string()
    .min(5, 'password must be longer or equal to 5')
    .max(30, 'password must be shorter than 30')
    .required('password is required'),
  passwordconfirm: yup
    .string()
    .required('Repeat the password')
    .oneOf([yup.ref('password'), null], "passwords don't match")
    .required('Password confirm is required'),
});

export const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordconfirm: '',
    },
    onSubmit,
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

      <TextInput
        placeholder="Repeat password"
        value={formik.values.passwordconfirm}
        onChangeText={formik.handleChange('passwordconfirm')}
        style={[styles.box, formik.errors.password ? styles.error : null]}
      />
      {formik.touched.passwordconfirm && formik.errors.passwordconfirm && (
        <Text style={{ color: 'red' }}>{formik.errors.passwordconfirm}</Text>
      )}

      <Pressable onPress={formik.handleSubmit} style={styles.submit}>
        <Text>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const [createUser, result] = useMutation(SIGN_UP, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      console.log(messages);
    },
  });

  const onSubmit = async (values) => {
    const { username, password } = values;
    const user = {
      username: username,
      password: password,
    };

    try {
      await createUser({
        variables: { user },
      });
      console.log(result);
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignUp;
