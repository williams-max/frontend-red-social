import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

const users = [
  { id: '1', name: 'John Doe', avatar: 'https://i.ibb.co/9ZjWrZG/men.png' },
  { id: '2', name: 'Jane Smith', avatar: 'https://i.ibb.co/9ZjWrZG/men.png' },
  { id: '3', name: 'Mike Johnson', avatar: 'https://i.ibb.co/9ZjWrZG/men.png' },
];

const UserListScreen = ({ navigation }) => {
  const handlePress = (user) => {
    navigation.navigate('MessageScreen', { user });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userContainer} onPress={() => handlePress(item)}>
            <Avatar rounded size="medium" source={{ uri: item.avatar }} containerStyle={styles.avatar} />
            <Text style={styles.userName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  avatar: {
    marginRight: 15,
  },
  userName: {
    fontSize: 18,
    color: '#333',
  },
});

export default UserListScreen;
