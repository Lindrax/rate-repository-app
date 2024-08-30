import { useQuery } from '@apollo/client';
import { FlatList, Text, View } from 'react-native';
import { useParams } from 'react-router-native';
import { BLOG, ME } from '../graphql/queries';
import Item from './RepositoryItem';
import { StyleSheet } from 'react-native';
import theme from '../theme';
import { ReviewItem } from './SingleItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
  },
  basic: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  text: {
    maxWidth: 250,
    marginTop: 5,
  },
  rating: {
    width: 40,
    height: 40,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Reviews = () => {
  const { data, loading } = useQuery(ME, {
    variables: {
      includeReviews: true,
    },
  });
  if (loading) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }

  const reviewNodes = data.me
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
    />
  );
};

export default Reviews;
