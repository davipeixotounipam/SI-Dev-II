import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Cadastrar Cursos" onPress={() => navigation.navigate('Cursos')} />
      <Button title="Cadastrar Períodos" onPress={() => navigation.navigate('Periodos')} />
      <Button title="Cadastrar Alunos" onPress={() => navigation.navigate('Alunos')} />
      <Button title="Cadastrar Temas" onPress={() => navigation.navigate('Temas')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    top: '35%',
    gap: 12,
    paddingHorizontal: 20,
  },
});
