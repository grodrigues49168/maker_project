import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import firestore from "../../../config/firebase";


const activeUsersCollection = collection(firestore, 'activeUsers'); // Use a coleção diretamente

export default function Profile() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Adicione o estado para o usuário atual

  useEffect(() => {
    const updateActiveUsers = async (user) => {
      const userDocRef = doc(activeUsersCollection, user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        timestamp: serverTimestamp(), // Use serverTimestamp() para carimbo de data/hora do servidor
      });
    };

    const fetchActiveUsers = async () => {
      const activeUsersSnapshot = await activeUsersCollection.get();
      const activeUsers = [];
      activeUsersSnapshot.forEach((doc) => {
        activeUsers.push(doc.data());
      });
      setUsers(activeUsers);
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); // Atualiza o usuário atual (currentUser) com o usuário autenticado
        updateActiveUsers(user);
      }
    });

    fetchActiveUsers();

    // Certifique-se de cancelar a inscrição no desmontamento do componente para evitar vazamentos de memória
    return () => unsubscribe();
  }, []);

  const renderUserCard = (item) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.email}</Text>
        <Text style={styles.username}> {item.uid}</Text>
        <Text style={styles.email}>{item.timestamp}</Text>
      </View>
    );
  };
  
  

  return (
        <View style={styles.container}>
      {currentUser && renderUserCard(currentUser)}
      <FlatList
        data={users}
        renderItem={({ item }) => renderUserCard(item)}
        keyExtractor={(item) => item.uid}
      />
</View>

  );
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

