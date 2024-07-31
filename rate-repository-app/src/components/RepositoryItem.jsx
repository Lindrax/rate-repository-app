import { Image, View } from 'react-native';
import Text from './Text';
import { StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  fullName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  stats: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  statItem: {
    flex: 1,
    minWidth: 100,
  },
  statValue: {
    fontWeight: 'bold',
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const BasicInfo = ({ item }) => {
  console.log(item);
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.fullName}>{item.fullName}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.language}>{item.language}</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {formatCount(item.stargazersCount)}
            </Text>
            <Text>Stars</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{formatCount(item.forksCount)}</Text>
            <Text>Forks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {formatCount(item.reviewCount)}
            </Text>
            <Text>Reviews</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {formatCount(item.ratingAverage)}
            </Text>
            <Text>Rating</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const Item = ({ item }) => {
  return (
    <View style={styles.container}>
      <BasicInfo item={item} />
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
