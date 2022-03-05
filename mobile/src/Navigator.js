import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicial from './screens/Inicial';
import Cadastro from './screens/Cadastro';
import ConfirmaCadastro from './screens/children/cadastro/ConfirmaCadastro';
import InsereCodigo from './screens/InsereCodigo';
import ScanQR from './screens/ScanQR';
import DadosCadastro from './screens/children/cadastro/DadosCadastro';
import CameraCadastro from './screens/children/cadastro/CameraCadastro';
import Login from './screens/Login';
import Desconectar from './screens/Desconectar';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const headerOptions = {
  headerShown: false,
};

const CadastroStack = createStackNavigator();

function CadStack({ navigation }) {
  return (
    <CadastroStack.Navigator initialRouteName="Cadastro">
      <CadastroStack.Screen
        name="Cadastro"
        component={Cadastro}
        options={headerOptions}
      />
      <CadastroStack.Screen
        name="ConfirmaCadastro"
        component={ConfirmaCadastro}
        options={headerOptions}
      />
      <CadastroStack.Screen
        name="DadosCadastro"
        component={DadosCadastro}
        options={headerOptions}
      />
      <CadastroStack.Screen
        name="CameraCadastro"
        component={CameraCadastro}
        options={headerOptions}
      />
    </CadastroStack.Navigator>
  );
}

function Navigator() {

  const user = useSelector((state) => state.user)

  return (
      <Stack.Navigator initialRouteName={user.conectado ? 'Desconectar' : 'Inicial'}>
        {!user.conectado && <Stack.Screen
          name="Inicial"
          component={Inicial}
          options={headerOptions}
        />}
        {!user.conectado && <Stack.Screen name="Login" component={Login} options={headerOptions} />}
        {!user.conectado && <Stack.Screen name="Scan" component={ScanQR} options={headerOptions} />}
        {!user.conectado && <Stack.Screen
          name="Cadastro"
          component={CadStack}
          options={headerOptions}
        />}
        {user.conectado && <Stack.Screen
          name="Desconectar"
          component={Desconectar}
          options={headerOptions}
        />}
        {!user.conectado && <Stack.Screen
          name="Codigo"
          component={InsereCodigo}
          options={headerOptions}
        />}
        {!user.conectado && <Stack.Screen
          name="CameraCadastro"
          component={CameraCadastro}
          options={headerOptions}
        />}
        {!user.conectado && <Stack.Screen
          name="CameraAcesso"
          component={CameraCadastro}
          options={headerOptions}
        />}
      </Stack.Navigator>
  );
}

export default Navigator;
