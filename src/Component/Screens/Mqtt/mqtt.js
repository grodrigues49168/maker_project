import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Paho from 'paho-mqtt';
import firestore from '../../../config/firebase';

const client = new Paho.Client('10.44.1.35', 9001, '/');

export default function App() {
  const [moisture, setMoisture] = useState(0);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const onMessageArrived = async (message) => {
      if (message.destinationName === 'acesso/usuario') {
        const receivedMoisture = parseFloat(message.payloadString);
        setMoisture(receivedMoisture);

        // Consultar o Firestore com base no ID recebido
        const userId = message.payloadString; // Use o número recebido como ID
        try {
          const userDoc = await firestore.collection('activeUsers').doc(userId).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setUserData(userData);
          } else {
            console.log(`Documento com ID ${userId} não encontrado.`);
            setUserData(null);
          }
        } catch (error) {
          console.error('Erro ao consultar Firestore: ', error);
        }
      }
    };

    const onConnect = () => {
      client.subscribe('acesso/usuario');
    };

    client.connect({ onSuccess: onConnect });
    client.onMessageArrived = onMessageArrived;

    return () => {
      client.disconnect();
    };
  }, []);

  return (
    <View>
      <Text>ID:</Text>
      <Text>{moisture}</Text>
      {userData && (
        <View>
          <Text>Informações do Usuário:</Text>
          <Text>Nome: {userData.nome}</Text>
          {/* Adicione mais campos conforme necessário */}
        </View>
      )}
    </View>
  );
}
