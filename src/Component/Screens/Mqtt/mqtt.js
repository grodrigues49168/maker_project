import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { collection, query, where, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import firestore from '../../../config/firebase';
import Paho from 'paho-mqtt';
import { doc, setDoc } from 'firebase/firestore';
import styles from './styles'

const client = new Paho.Client('10.44.1.35', 9001, '/');

export default () => {
    const [contatos, setContatos] = useState([]);
    const [termo, setTermo] = useState('');

    useEffect(() => {
        const onMessageArrived = (message) => {
          // Log da mensagem recebida
          console.log('Mensagem recebida:', message.payloadString);
    
          // Atualiza o termo diretamente com o payload da mensagem (como string)
          setTermo(message.payloadString);
        };
    
        const onConnect = () => {
          // Assina o tópico desejado
          client.subscribe('acesso/usuario');
        };
    
        client.connect({ onSuccess: onConnect });
        client.onMessageArrived = onMessageArrived;
    
        return () => {
          client.disconnect();
        };
    }, []);


    useEffect(() => {
        // A busca só é chamada após a atualização completa do estado
        if (termo !== '') {
          buscar();
        }
    }, [termo]);

    async function buscar() {
        try {
          // Log para verificar se o termo está correto
          console.log('Termo de busca:', termo);

          const contatosCol = collection(firestore, 'users');
          const q = query(contatosCol, where("id", "==", termo));
          const contatosSnapshot = await getDocs(q);
          const contatosList = contatosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setContatos(contatosList);
          const timestamp = serverTimestamp();
          updateDoc(doc(firestore, "users",termo),{
            timeBio: timestamp,
          })

        } catch (error) {
          console.error('Erro ao buscar contatos:', error);
        }
    }

    return (
        <View style={styles.container} >
            <Text style={styles.titl} >Utimo acessos</Text>
            <Text style={styles.title}>Termo Atual: {termo}</Text>
            <FlatList
                data={contatos}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <View  style={styles.card}>
                        <Text style={styles.title}>id: {item.id}</Text>
                        <Text style={styles.title}>Nome: {item.nome}</Text>
                        <Text style={styles.title}>E-mail: {item.email}</Text>
                        <Text>{'\n'}</Text>
                    </View>
                }
            />
        </View>
    );
}

