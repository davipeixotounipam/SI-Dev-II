// screens/CadastroCurso.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function CadastroCurso() {
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');

  const salvar = async () => {
    await addDoc(collection(db, 'cursos'), { nome, sigla });
    alert('Curso salvo com sucesso!');
    setNome('');
    setSigla('');
  };

  return (
    <View style={styles.container}>
      <Text>Nome do curso:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />
      <Text>Sigla:</Text>
      <TextInput style={styles.input} value={sigla} onChangeText={setSigla} />
      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    borderRadius: 5,
  },
});