// Inicio.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { collection, onSnapshot } from "firebase/firestore"; 
import { firestore } from '../db/firestore'; //configuraçao db firebase
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const Card = ({ vistoria }) => {
  const navigation = useNavigation(); // Use the navigation hook

  //convertendo o timestamp pro rn conseguir ler
  const data = vistoria.data.toDate().toLocaleDateString();

  if(vistoria.aprovado){
    return (
      <Pressable 
        style={styles.card} 
        onPress={() => navigation.navigate('DetalhesVistoria', { vistoria })} // Navigate to the details screen
      >
        <Text style={styles.title}>Modelo: {vistoria.modelo}</Text>
        <Text>Data: {data}</Text>
        <Text>Local: {vistoria.local}</Text>
        <Text>Responsável: {vistoria.responsavel}</Text>
        <Text>Aprovado: {vistoria.aprovado ? 'Sim' : 'Não'}</Text>
        <Text>Observações: {vistoria.observacoes}</Text>
      </Pressable>
    );
  }
};

export default function Inicio() {
  const [vistorias, setVistorias] = useState([]); //oq armazena as vistorias encontradas no db

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "vistorias"), (snapshot) => { //checa no db
      const vistoriasArray = [];
      snapshot.forEach((doc) => {
        vistoriasArray.push({ id: doc.id, ...doc.data() }); //adiciona os encontrados no db
      });
      setVistorias(vistoriasArray); //seta
    }, (error) => {
      console.error("Erro ao buscar as vistorias: ", error);
    });

    //limpa e desmonta o componente
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {vistorias.map((vistoria, index) => (
          <Card key={index} vistoria={vistoria} /> //vistorias
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  }
});
