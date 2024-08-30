import { FlatList, View, StyleSheet, _View, TextInput } from 'react-native';
import Item from './RepositoryItem';
import React, { useEffect, useState } from 'react';
import useRepositories from '../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;

    return (
      <Searchbar
        placeholder="Filter"
        onChangeText={props.setFilter}
        value={props.filter}
      />
    );
  };

  render() {
    const props = this.props;
    const repositoryNodes = props.repositories
      ? props.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <Item item={item} />}
        ListHeaderComponent={<this.renderHeader />}
      />
    );
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState('RATING_AVERAGE');
  const [direction, setDirection] = useState('DESC');
  const [filter, setFilter] = useState('');
  const [filterDebounced] = useDebounce(filter, 500);
  const { repositories, loading } = useRepositories(
    order,
    direction,
    filterDebounced
  );

  return (
    <View>
      <Picker
        selectedValue={order}
        onValueChange={(itemValue) => {
          if (itemValue === 'LOWEST_RATING') {
            setDirection('ASC');
            setOrder('RATING_AVERAGE');
          } else {
            setOrder(itemValue);
            setDirection('DESC');
          }
        }}
      >
        <Picker.Item label="Lates repositories" value="CREATED_AT" />
        <Picker.Item
          label="Highest rated repositories"
          value="RATING_AVERAGE"
        />
        <Picker.Item label="Lowest rated repositories" value="LOWEST_RATING" />
      </Picker>

      <RepositoryListContainer
        repositories={repositories}
        filter={filter}
        setFilter={setFilter}
      />
    </View>
  );
};

export default RepositoryList;
