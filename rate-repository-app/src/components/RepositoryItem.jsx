import { Image, View } from 'react-native';
import Text from './Text';
import { StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 15,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 10,
  },
  content: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  basic: {
    padding: 0,
    flexDirection: 'column',
    maxWidth: 300,
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 5,
    color: 'white',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  stats: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 10,
    gap: 25,
  },
  statitem: {
    flexDirection: 'column',
    gap: 7,
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const Item = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }} />

        <View style={styles.basic}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.statitem}>
          <Text fontWeight="bold">{formatCount(item.stargazersCount)}</Text>
          <Text color="textSecondary"> stars</Text>
        </View>
        <View style={styles.statitem}>
          <Text fontWeight="bold">{formatCount(item.forksCount)}</Text>
          <Text color="textSecondary"> forks </Text>
        </View>
        <View style={styles.statitem}>
          <Text fontWeight="bold">{formatCount(item.reviewCount)}</Text>
          <Text color="textSecondary"> Reviews</Text>
        </View>
        <View style={styles.statitem}>
          <Text fontWeight="bold">{formatCount(item.ratingAverage)}</Text>
          <Text color="textSecondary"> Rating </Text>
        </View>
      </View>
    </View>
  );
};
export default Item;

/* 
name
desc
language
n forks
n stars
rating avg
n reviews */
