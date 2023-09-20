import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Paho from 'paho-mqtt';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import style from './style';

export default function MQTTDisplay() {
  const [mqttMessage, setMqttMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Configurações do cliente MQTT
    const client = new Paho.Client('10.44.1.35', 1880, '/');
    const topic = 'acesso/usuario';

    const onConnect = () => {
      console.log('Conexão MQTT estabelecida.');
      setIsConnected(true); // Define isConnected como true quando conectado
      // Assine o tópico após a conexão bem-sucedida
      client.subscribe(topic);
    };

    const onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(`Conexão MQTT perdida: ${responseObject.errorMessage}`);
        setIsConnected(false); // Define isConnected como false quando desconectado
      }
    };

    const onMessageArrived = (message) => {
      if (message.destinationName === topic) {
        setMqttMessage(message.payloadString);
        // Envie os dados para o Firestore quando novas mensagens forem recebidas
        sendDataToFirestore(message.payloadString);
      }
    };

    // Conecte-se ao servidor MQTT
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({ onSuccess: onConnect });

    // Função para atualizar a assinatura a cada 5 segundos
    const refreshSubscription = setInterval(() => {
      if (client.isConnected()) {
        client.subscribe(topic);
      }
    }, 5000);

    // Certifique-se de desconectar o cliente MQTT quando o componente for desmontado
    return () => {
      clearInterval(refreshSubscription); // Limpa o intervalo de atualização
      client.disconnect();
      setIsConnected(false); // Define isConnected como false ao desconectar
    };
  }, []); // O array vazio [] garante que o efeito seja executado apenas uma vez, como componentDidMount

  // Função para enviar dados para o Firestore
  const sendDataToFirestore = (data) => {
    const firebaseConfig = {
      // Substitua 'your_firebase_config' pelo objeto de configuração do Firebase
    };

    if (!firebase.apps.length) {
      initializeApp(firebaseConfig); // Use initializeApp em vez de firebase.initializeApp
    }

    const db = firebase.firestore();
    const collection = db.collection('users_bio');

    // Adicione os dados ao Firestore
    collection.add({
      timestamp: new Date(),
      message: data,
    })
      .then((docRef) => {
        console.log('Dados enviados para o Firestore com ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Erro ao enviar dados para o Firestore: ', error);
      });
  };

  return (
    <View  style={style.card} >
      <Text style={style.title} >Informação do MQTT:</Text>
      <Text style={style.title}>{mqttMessage}</Text>
      <Text style={style.title}>Status da Conexão MQTT: {isConnected ? 'Conectado' : 'Desconectado'}</Text>
    </View>
  );
}



