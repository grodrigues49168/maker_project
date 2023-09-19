import { Client } from 'react-native-paho-mqtt';
import Paho from 'paho-mqtt'

const client = new Paho.Client('10.44.1.35', 9001, '/');


export const connectMQTT = () => {
  client.connect({ onSuccess: onConnect });
};

export const onConnect = () => {
  console.log('Connected to MQTT broker');
};

export const subscribeToTopic = (topic, callback) => {
  client.subscribe(topic);
  client.onMessageArrived = (message) => {
    callback(message.payloadString);
  };
};
