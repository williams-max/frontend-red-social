import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import axiosInstance from '../config/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { useRoute } from '@react-navigation/native';
import io from 'socket.io-client';

// const socket = io('http://192.168.185.33:3000'); // Cambia a la URL de tu servidor
const socket = io('http://192.168.145.33:3000', {
  transports: ['websocket', 'polling']
});

const MessageScreen = () => {
  const route = useRoute();
  const [messages, setMessages] = useState([
  ]);
  const [newMessage, setNewMessage] = useState('');
  const { userInfo } = useContext(AuthContext);
  const [socketConnected, setSocketConnected] = useState(false); // Estado para monitorear la conexión
  const parametros = route.params; // Recupera `user` desde `route.params`

  // console.log('parametros ',parametros)
  useEffect(() => {
    setMessages([]);
    loadMessages()
      // Conectar al servidor y unirse a la conversación
      socket.connect();

      // Conectar al servidor y unirse a la conversación
    socket.connect();

    // Eventos para verificar la conexión
    socket.on('connect', () => {
      console.log('Conexión con Socket.IO exitosa');
      setSocketConnected(true); // Cambia el estado para indicar conexión exitosa
    });

    socket.on('connect_error', (error) => {
      console.error('Error de conexión con Socket.IO:', error);
      // Alert.alert('Error', 'No se pudo conectar con el servidor. Por favor, revisa tu conexión.');
      setSocketConnected(false); // Cambia el estado para indicar falla en la conexión
    });

    socket.on('disconnect', () => {
      console.log('Socket desconectado');
      setSocketConnected(false); // Indica que el socket está desconectado
    });
      socket.emit('join', parametros.user.id); // Únete a la conversación específica
  
      // Escuchar mensajes en tiempo real
      socket.on('mensaje', (message) => {
        console.log('mejaje ...z ', message)
        setMessages((prevMessages) => [...prevMessages, message]);
      });
  
      return () => {
        socket.disconnect(); // Desconectar al desmontar el componente
      };
  }, [route.params.user]);

  const loadMessages = async () => {
    try {

      if(!userInfo?.id || !parametros?.user?.id){
        return ;
      }
      const responseExiste = await axiosInstance.post('/existe-conversacion',{
        "remitenteId": userInfo.id,
        "receptorId":  parametros.user.id
      });
      if (responseExiste?.data?.length > 0) {
        const response = await axiosInstance.get(`/message?conversationId=${responseExiste.data[0].conversation_id}`);
        setMessages(response.data)
      }
      // setUsuarios(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSend = async () => {
    try {
      /*const creacionMensaje = await axiosInstance.post('/message',{
        "remitenteId": userInfo.id,
        "receptorId":  parametros.user.id,
        "content": newMessage
      });
      await loadMessages()
       */
        // Obtener el `conversationId` existente entre el remitente y receptor
      const responseExiste = await axiosInstance.post('/existe-conversacion', {
        "remitenteId": userInfo.id,
        "receptorId": parametros.user.id
      });
      const conversationId = responseExiste.data[0].conversation_id;

      const messageData = {
        conversationId,
        content: newMessage,
        remitenteId: userInfo.id,
        receptorId:  parametros.user.id,
      };

      // Emitir el mensaje en tiempo real con Socket.IO
      socket.emit('mensaje', messageData);
      console.log('bebeto')
      // Guardar el mensaje en la base de datos
      await axiosInstance.post('/message', messageData);

      // Limpiar el campo de entrada y actualizar los mensajes
      setNewMessage('');
      await loadMessages();
      /* setMessages((prevMessages) => [
        ...prevMessages,
        { ...messageData, createdAt: new Date().toISOString() }
      ]); */
    } catch (error) {
      console.log("error ----> ", error)
    }
  };

  const compareId = (senderId) => {
    if (userInfo?.id === senderId) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.messageList}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              compareId(message.senderId) ? styles.sentMessage : styles.receivedMessage,
            ]}
          >
            {!compareId(message.senderId) && (
              <Avatar
                rounded
                size="small"
                source={{ uri: message?.userCreador?.imageUrl }} // Reemplaza con la URL real
                containerStyle={styles.avatar}
              />
            )}
            <View style={styles.messageContent}>
              <View
                style={[
                  styles.messageBubble,
                  compareId(message.senderId) ? styles.sentBubble : styles.receivedBubble,
                ]}
              >
                <Text style={styles.messageText}>{message.content}</Text>
              </View>
              <Text style={styles.messageTime}>{message.createdAt}</Text>
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
        <TouchableOpacity style={styles.sendButton} onPress={() => handleSend()}>
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
