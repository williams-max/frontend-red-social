import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import axiosInstance from '../config/axiosConfig';
import { AuthContext } from '../context/AuthContext';

const UserListScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    loadUsersConversation();
  }, []);

  const loadUsersConversation = async () => {
    const response = await axiosInstance.get(`users-conversation?userId=${state.user.id}`);
    setListUsers(response.data);
  };

  const handlePress = (item) => {
    const user = item.messagelast.userCreador
    navigation.navigate('MessageScreen', { user });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userContainer} onPress={() => handlePress(item)}>
            <Avatar rounded size="medium" source={{ uri: item.messagelast.userCreador.imageUrl }} containerStyle={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.userName}>{item.messagelast.userCreador.name}</Text>
              <Text style={styles.content}>{item.messagelast.content}</Text>
            </View>
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
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 14,
    // color: '#999',
    fontWeight:'bold',
    marginTop: 5,
  },
});

export default UserListScreen;
