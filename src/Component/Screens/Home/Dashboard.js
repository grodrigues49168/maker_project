import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import Styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Paho from 'paho-mqtt';
import { Avatar } from 'react-native-paper';
import { SquishButton } from 'react-native-squish-button';


const Fundo = require ('../../../images/fundo4.jpg')

export default function App() {
  useEffect(() => {
    const client = new Paho.Client('10.44.1.35', 9001, '/');

    client.connect({
      onSuccess: function () {
        console.log('Conectado');
        client.subscribe('acesso/botao');
      },
      onFailure: function () {
        console.log('Desconectado');
      },
    });

    return () => {
      client.disconnect();
    };
  }, []);

  function ligar() {
    try {
      const client = new Paho.Client('10.44.1.35', 9001, '/');
      client.connect({
        onSuccess: function () {
          console.log('Conectado');
          client.subscribe('acesso/botao');
          const message1 = new Paho.Message('on');
          message1.destinationName = 'acesso/botao';
          client.send(message1);

          setTimeout(() => {
            const message2 = new Paho.Message('off');
            message2.destinationName = 'acesso/botao';
            client.send(message2);
            client.disconnect();
          }, 10000);
        },
        onFailure: function () {
          console.log('Desconectado');
        },
      });
    } catch (error) {
      alert('Problema na conexão');
    }
  }

  return (
    <ImageBackground source={Fundo} style={Styles.fundo} >
    
        <TouchableOpacity style={Styles.botao} onPress={ligar}  name="abrir">
              <SquishButton
            width={300}
            height={100}
            color="#4E5372"
            squish={7}
            radius={5}
            text="Abrir porta "
            textStyle={{
                color: 'white',
                fontFamily: 'Helvetica',
                fontWeight: 'bold',
                fontSize: 16,
            }}
        />
        
        </TouchableOpacity>

</ImageBackground>
  );
}