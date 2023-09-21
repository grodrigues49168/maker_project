import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Paho from 'paho-mqtt';
import style from './style';

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

        // Tentar reconectar apenas quando a conexão estiver desconectada
        tryReconnect();
      }
    };

    const onMessageArrived = (message) => {
      if (message.destinationName === topic) {
        setMqttMessage(message.payloadString);
      }
    };

    // Função para tentar se reconectar
    const tryReconnect = () => {
      if (!client.isConnected()) {
        client.connect({ onSuccess: onConnect });
      }
    };

    // Conecte-se ao servidor MQTT assim que o componente for montado
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({ onSuccess: onConnect });

    // Certifique-se de desconectar o cliente MQTT quando o componente for desmontado
    return () => {
      client.disconnect();
      setIsConnected(false); // Define isConnected como false ao desconectar
    };
  }, []); // O array vazio [] garante que o efeito seja executado apenas uma vez, como componentDidMount

  return (
    <View style={style.card}>
      <Text style={style.title}>Informação do MQTT:</Text>
      <Text style={style.title}>{mqttMessage}</Text>
      <Text style={style.title}>Status da Conexão MQTT: {isConnected ? 'Conectado' : 'Desconectado'}</Text>
    </View>
  );
}
