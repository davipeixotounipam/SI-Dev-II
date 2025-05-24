// screens/CadastroPeriodo.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { collection, addDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function CadastroPeriodo() {
  const [descricao, setDescricao] = useState('');
  const [numero, setNumero] = useState('');
  const [curso, setCurso] = useState('');

  const salvar = async () => {
    try {
      if (!descricao || !numero || !curso) {
        alert('Preencha todos os campos.');
        return;
      }

      const cursoRef = doc(db, 'cursos', curso);

      await addDoc(collection(db, 'periodos'), {
        descricao,
        numero: parseInt(numero),
        curso: cursoRef,
      });

      alert('Período cadastrado com sucesso!');
      setDescricao('');
      setNumero('');
      setCurso('');
    } catch (error) {
      console.error('Erro ao salvar período:', error);
      alert('Erro ao salvar período.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Descrição:</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} />

      <Text>Número:</Text>
      <TextInput
        style={styles.input}
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"
      />

      <Text>ID do Curso (cole de /cursos/xxxxxxxxx):</Text>
      <TextInput style={styles.input} value={curso} onChangeText={setCurso} />

      <Button title="Salvar Período" onPress={salvar} />
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
