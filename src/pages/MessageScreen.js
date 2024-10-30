import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

const MessageScreen = () => {
  const messages = [
    { id: '1', text: 'Hello! How are you?', isSent: true, time: '10:00 AM' },
    { id: '2', text: 'I’m good, thanks!', isSent: false, time: '10:01 AM' },
    { id: '3', text: 'Great! Want to catch up later?', isSent: true, time: '10:05 AM' },
    { id: '4', text: 'Sure, let me know the time.', isSent: false, time: '10:06 AM' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messageList}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isSent ? styles.sentMessage : styles.receivedMessage,
            ]}
          >
            {!message.isSent && (
              <Avatar
                rounded
                size="small"
                source={{ uri: 'https://i.ibb.co/9ZjWrZG/men.png' }} // Reemplaza con la URL real
                containerStyle={styles.avatar}
              />
            )}
            <View style={styles.messageContent}>
              <View
                style={[
                  styles.messageBubble,
                  message.isSent ? styles.sentBubble : styles.receivedBubble,
                ]}
              >
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
              <Text style={styles.messageTime}>{message.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Botón flotante */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="add" type="material" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    backgroundColor: '#e5e5ea',
  },
  messageList: {
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  sentMessage: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  avatar: {
    marginRight: 8,
  },
  messageContent: {
    maxWidth: '75%',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  sentBubble: {
    backgroundColor: '#d1e7ff', // Azul claro para los mensajes enviados
    alignItems: 'flex-end',
  },
  receivedBubble: {
    backgroundColor: '#ffffff', // Blanco para los mensajes recibidos
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    color: 'gray',
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff69b4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

export default MessageScreen;
