import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Avatar, Button, Icon } from 'react-native-elements';

const Home = () => {
  const posts = [
    { id: '1', description: 'Post description goes here...', imageUrl: 'https://i.ibb.co/9ZjWrZG/men.png' },
    { id: '2', description: 'Another post description...', imageUrl: 'https://i.ibb.co/5KMXQyt/woman-1.png' },
    { id: '3', description: 'More content...', imageUrl: 'https://i.ibb.co/hH4mPTb/woman-2.png' },
    { id: '4', description: 'More content...', imageUrl: 'https://your-post-image-url.com' },
  ];

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <Image style={styles.postImage} source={{ uri: item.imageUrl }} />
      <Text style={styles.postText}>{item.description}</Text>
      <View style={styles.iconContainer}>
        <Icon name="favorite" type="material" color="#ff5252" />
        <Icon name="chat-bubble-outline" type="material" color="#4a90e2" />
        <Icon name="bookmark-outline" type="material-community" color="black" />
      </View>
    </View>
  );
   
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Avatar rounded size="large" source={{ uri: 'https://i.ibb.co/vzTngDp/download.png' }} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Leko</Text>
          <Text style={styles.userStats}>Posts: 23 | Followers: 120</Text>
        </View>
        <View style={styles.buttons}>
          <Button title="Follow" buttonStyle={styles.followButton} />
          <Button title="Message" buttonStyle={styles.messageButton} />
        </View>
      </View>

      {/* Posts Section */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.postsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  userStats: {
    color: 'gray',
  },
  buttons: {
    flexDirection: 'row',
  },
  followButton: {
    backgroundColor: '#87ceeb',
    marginRight: 10,
  },
  messageButton: {
    backgroundColor: '#ff69b4',
  },
  postsContainer: {
    paddingHorizontal: 10,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  postImage: {
    width: '100%',
    height: 150, // Más alto para hacer la imagen más apaisada
    borderRadius: 10,
  },
  postText: {
    marginTop: 10,
    fontSize: 16,
  },
  iconContainer: {
    borderRadius:10,
    backgroundColor: '#cfcfcf',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin:0
    // marginTop: 10,
  },
});

export default Home;