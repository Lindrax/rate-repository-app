import { useQuery } from '@apollo/client';
import { FlatList, Text, View } from 'react-native';
import { useParams } from 'react-router-native';
import { BLOG } from '../graphql/queries';
import Item from './RepositoryItem';
import { StyleSheet } from 'react-native';
import theme from '../theme';

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

const dateParser = (date) => {
  return date.split('T')[0];
};
const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text style={{ color: theme.colors.primary }}>{review.rating}</Text>
      </View>
      <View style={styles.basic}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          {review.user.username}
        </Text>
        <Text style={{ color: 'grey' }}>{dateParser(review.createdAt)}</Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleItem = () => {
  const { id } = useParams();
  console.log(id);
  const { data, loading } = useQuery(BLOG, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId: id },
  });
  if (loading) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }
  const reviewNodes = data.repository.reviews
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  console.log(data);
  console.log(reviewNodes);
  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ListHeaderComponent={() => (
        <View>
          <Item item={data.repository} url={data.repository.url} />
          <ItemSeparator />
        </View>
      )}
    />
  );

  //<Item item={data.repository} url={data.repository.url}></Item>;
};

export default SingleItem;
