import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';

import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleItem from './SingleItem';
import Review from './Review';
import SignUp from './SignUp';
import Reviews from './Reviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/:id" element={<SingleItem />} />
        <Route path="/review" element={<Review />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
