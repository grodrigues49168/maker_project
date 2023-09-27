import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Paho from 'paho-mqtt';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firestore from '../../../config/firebase';

const client = new Paho.Client('10.44.1.35', 9001, '/');

const sendMoistureToFirestore = async (moisture) => {

  const docRef = firestore.collection('activeUsers').doc();


  await docRef.update({
    moisture: moisture,
    timestamp: new Date(),
  });
};

export default function App() {
  const [moisture, setMoisture] = useState(0);

  useEffect(() => {
    const onMessageArrived = (message) => {
      if (message.destinationName === 'acesso/usuario') {
        setMoisture(parseFloat(message.payloadString));
        sendMoistureToFirestore(moisture);
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
    </View>
  );
}
