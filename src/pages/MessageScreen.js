import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

const MessageScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! How are you?', isSent: true, time: '10:00 AM' },
    { id: '2', text: 'I’m good, thanks!', isSent: false, time: '10:01 AM' },
    { id: '3', text: 'Great! Want to catch up later?', isSent: true, time: '10:05 AM' },
    { id: '4', text: 'Sure, let me know the time.', isSent: false, time: '10:06 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMessageData = {
        id: Math.random().toString(),
        text: newMessage,
        isSent: true,
        time: currentTime,
      };
      setMessages((prevMessages) => [...prevMessages, newMessageData]);
      setNewMessage('');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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

      {/* Caja de entrada y botón de envío */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Icon name="send" type="material" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#e5e5ea',
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f5',
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff69b4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessageScreen;
