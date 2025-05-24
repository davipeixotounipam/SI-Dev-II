import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CadastroCurso from './src/screens/CadastroCurso';
import CadastroPeriodo from './src/screens/CadastroPeriodo';
// import CadastroAluno from './src/screens/CadastroAluno';
// import CadastroTema from './src/screens/CadastroTema';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Periodos">
        <Stack.Screen name="Cursos" component={CadastroCurso} />
        <Stack.Screen name="Periodos" component={CadastroPeriodo} />
        {/* <Stack.Screen name="Alunos" component={CadastroAluno} />
        <Stack.Screen name="Temas" component={CadastroTema} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
