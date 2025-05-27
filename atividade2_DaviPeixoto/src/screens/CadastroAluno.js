import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, ActivityIndicator
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { collection, getDocs, addDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function CadastroAluno() {
  const [nome, setNome] = useState('');
  const [cursoId, setCursoId] = useState('');
  const [periodoId, setPeriodoId] = useState('');
  const [cursos, setCursos] = useState([]);
  const [periodosFiltrados, setPeriodosFiltrados] = useState([]);
  const [todosPeriodos, setTodosPeriodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      const cursosSnapshot = await getDocs(collection(db, 'cursos'));
      const periodosSnapshot = await getDocs(collection(db, 'periodos'));

      const cursosLista = cursosSnapshot.docs.map((docSnap) => ({
        label: docSnap.data().nome,
        value: docSnap.id,
        key: docSnap.id,
      }));

      cursosLista.sort((a, b) => a.label.localeCompare(b.label)); // ordena alfabeticamente

      const periodosLista = periodosSnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        label: docSnap.data().descricao,
        value: docSnap.id,
        cursoRef: docSnap.data().curso.id, // importante!
      }));

      setCursos(cursosLista);
      setTodosPeriodos(periodosLista);
      setLoading(false);
    };

    carregarDados();
  }, []);

  useEffect(() => {
    if (cursoId) {
      // Filtra os períodos do curso selecionado
      const filtrados = todosPeriodos.filter((p) => p.cursoRef === cursoId);
      setPeriodosFiltrados(filtrados);
      setPeriodoId(''); // limpa seleção anterior
    } else {
      setPeriodosFiltrados([]);
    }
  }, [cursoId]);

  const salvar = async () => {
    if (!nome || !cursoId || !periodoId) {
      alert('Preencha todos os campos.');
      return;
    }

    const cursoRef = doc(db, 'cursos', cursoId);
    const periodoRef = doc(db, 'periodos', periodoId);

    try {
      await addDoc(collection(db, 'alunos'), {
        nome,
        curso: cursoRef,
        periodo: periodoRef,
      });

      alert('Aluno cadastrado com sucesso!');
      setNome('');
      setCursoId('');
      setPeriodoId('');
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
      alert('Erro ao salvar aluno.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Carregando cursos e períodos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Nome do Aluno:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text>Curso:</Text>
      <RNPickerSelect
        onValueChange={(value) => setCursoId(value)}
        items={cursos}
        value={cursoId}
        placeholder={{ label: 'Selecione um curso', value: null }}
        style={{ inputIOS: styles.input, inputAndroid: styles.input }}
      />

      <Text>Período:</Text>
      <RNPickerSelect
        onValueChange={(value) => setPeriodoId(value)}
        items={periodosFiltrados}
        value={periodoId}
        placeholder={{ label: 'Selecione um período', value: null }}
        style={{ inputIOS: styles.input, inputAndroid: styles.input }}
      />

      <Button title="Salvar Aluno" onPress={salvar} />
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
