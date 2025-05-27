import React, { useEffect, useState } from 'react';
import {
  View, TextInput, Button, Text, StyleSheet, ActivityIndicator
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { collection, getDocs, getDoc, addDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function CadastroPeriodo() {
  const [numero, setNumero] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cursoSelecionado, setCursoSelecionado] = useState('');
  const [siglaCurso, setSiglaCurso] = useState('');
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCursos = async () => {
      const querySnapshot = await getDocs(collection(db, 'cursos'));
      const lista = [];

      querySnapshot.forEach((docSnap) => {
        lista.push({
          label: docSnap.data().nome,
          value: docSnap.id,
          key: docSnap.id,
        });
      });

      lista.sort((a, b) => a.label.localeCompare(b.label));
      setCursos(lista);
      setLoading(false);
    };

    fetchCursos();
  }, []);

  useEffect(() => {
    if (numero && siglaCurso) {
      setDescricao(`${numero}º Período - ${siglaCurso}`);
    } else {
      setDescricao('');
    }
  }, [numero, siglaCurso]);

  const handleCursoChange = async (cursoId) => {
    setCursoSelecionado(cursoId);

    if (cursoId) {
      const cursoRef = doc(db, 'cursos', cursoId);
      const cursoSnap = await getDoc(cursoRef);

      if (cursoSnap.exists()) {
        const sigla = cursoSnap.data().sigla;
        setSiglaCurso(sigla);
      }
    } else {
      setSiglaCurso('');
    }
  };

  const salvar = async () => {
    if (!descricao || !numero || !cursoSelecionado) {
      alert('Preencha todos os campos.');
      return;
    }

    try {
      const cursoRef = doc(db, 'cursos', cursoSelecionado);

      await addDoc(collection(db, 'periodos'), {
        descricao,
        numero: parseInt(numero),
        curso: cursoRef,
      });

      alert('Período salvo com sucesso!');
      setDescricao('');
      setNumero('');
      setCursoSelecionado('');
      setSiglaCurso('');
    } catch (error) {
      console.error('Erro ao salvar período:', error);
      alert('Erro ao salvar período.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Carregando cursos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Número:</Text>
      <TextInput
        style={styles.input}
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"
      />

      <Text>Curso:</Text>
      <RNPickerSelect
        onValueChange={handleCursoChange}
        items={cursos}
        value={cursoSelecionado}
        placeholder={{ label: 'Selecione um curso', value: null }}
        style={{ inputIOS: styles.input, inputAndroid: styles.input }}
      />

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
