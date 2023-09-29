import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import  firestore  from '../../../config/firebase'; // Certifique-se de importar sua configuração do Firebase aqui
import { collection, getDocs } from 'firebase/firestore';
import style from '../Cadastro/style';

export  default ()=>{
  const [contatos, setContatos] = useState ([{}])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')

  async function listar(){
    const contatosCol = collection(firestore, 'users');
    const contatosSnapshot = await getDocs(contatosCol);
    const contatosList = contatosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setContatos(contatosList);
}

  return(
    <View style={styles.container}>
      <FlatList
      data={contatos}
      keyExtractor={item=>item.id}
      renderItem={({item})=> 
        <View style={styles.card}> 
          <Text style={styles.titile}>id {item.id} </Text>
          <Text style={styles.titile}>email {item.email} </Text>
          <Text style={styles.titile}>nome {item.nome} </Text>
          

        </View> 
      }
      />
         <Button title='Listar' onPress={listar}/>

    </View>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 30,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    color: "#666",
    marginBottom: 5,
  },
  username: {
    fontStyle: "italic",
    marginBottom: 5,
  },
  website: {
    color: "blue",
  },
});




