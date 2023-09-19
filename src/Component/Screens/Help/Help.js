import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Paho from 'paho-mqtt';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default function MQTTDisplay() {
  const [mqttMessage, setMqttMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Configurações do cliente MQTT
    const client = new Paho.Client('10.44.1.35', 9001, '/');
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
          apiKey: "AIzaSyCCBhTZxbmIHDcSfscBmhstMpL-t3A89KA",
      authDomain: "maker-project-13166.firebaseapp.com",
      projectId: "maker-project-13166",
      storageBucket: "maker-project-13166.appspot.com",
      messagingSenderId: "489445184712",
      appId: "1:489445184712:web:00adb5524a57b0dee441fd",
      measurementId: "G-DP4CBB79MN"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.firestore();
    const collection = db.collection('UserBio');

    // Adicione os dados ao Firestore
    collection.add({
      id: 'otn73LSvxizMWZxouECo', // Substitua por um valor único ou deixe o Firestore gerar automaticamente
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: data,
      topic: 'acesso/usuario', // Adicione informações adicionais se necessário
      sender: 'JohnDoe', // Adicione informações adicionais se necessário
    })
    
      .then((docRef) => {
        console.log('Dados enviados para o Firestore com ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Erro ao enviar dados para o Firestore: ', error);
      });
  };

  return (
    <View>
      <Text>Informação do MQTT:</Text>
      <Text>{mqttMessage}</Text>
      <Text>Status da Conexão MQTT: {isConnected ? 'Conectado' : 'Desconectado'}</Text>
    </View>
  );
}


