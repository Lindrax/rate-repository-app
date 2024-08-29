import React from 'react';
import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/mutations';
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
  owner: yup.string().required('owner is required'),
  name: yup.string().required('name is required'),
  rating: yup.number().required('rating is required').min(0).max(100),
  review: yup.string(),
});

export const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      owner: '',
      name: '',
      rating: '',
      review: '',
    },
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Repository owner"
        value={formik.values.owner}
        onChangeText={formik.handleChange('owner')}
        style={[styles.box, formik.errors.owner ? styles.error : null]}
      />
      {formik.touched.owner && formik.errors.owner && (
        <Text style={{ color: 'red' }}>{formik.errors.owner}</Text>
      )}

      <TextInput
        placeholder="Repository name"
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
        style={[styles.box, formik.errors.name ? styles.error : null]}
      />
      {formik.touched.name && formik.errors.name && (
        <Text style={{ color: 'red' }}>{formik.errors.name}</Text>
      )}

      <TextInput
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        style={[styles.box, formik.errors.rating ? styles.error : null]}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
      )}

      <TextInput
        placeholder="Review"
        multiline
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
        style={[styles.box, formik.errors.review ? styles.error : null]}
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={{ color: 'red' }}>{formik.errors.review}</Text>
      )}

      <Pressable onPress={formik.handleSubmit} style={styles.submit}>
        <Text>Create a review</Text>
      </Pressable>
    </View>
  );
};

const Review = () => {
  const navigate = useNavigate();
  const [createReview, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      console.log(messages);
    },
  });

  const onSubmit = async (values) => {
    console.log(values);

    const review = {
      ownerName: values.owner,
      rating: Number(values.rating),
      repositoryName: values.name,
      text: values.review,
    };

    const response = await createReview({ variables: { review } });
    console.log(response);
    console.log();
    navigate(`/${response.data.createReview.repositoryId}`);
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export default Review;
