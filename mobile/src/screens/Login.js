import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import logo from '../assets/logo.png';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorSenha, setErrorSenha] = useState('');
  const [isLoading, setLoading] = useState(false);

  const clicaProsseguir = () => {
    let emailOk =
      email.length >= 7 && email.includes('@') && email.includes('.');
    let senhaOk = senha.trim().length > 8;

    if (emailOk && senhaOk) {
      setLoading(true);
      setErrorEmail('');
      setErrorSenha('');
      auth()
        .signInWithEmailAndPassword(email, senha)
        .then(response => {
          setLoading(false);
          alert(`Fez login com sucesso. ${response.user}`);
        })
        .catch(error => {
          setLoading(false);
          alert(`Ocorreu um erro ${error}`);
        });
    } else {
      if (!emailOk) {
        setErrorEmail('Verifique seu e-mail e tente novamente');
      }
      if (!senhaOk) {
        setErrorSenha('Digite uma senha válida');
      }
      clearTimeout();
      setTimeout(() => {
        setErrorEmail('');
        setErrorSenha('');
      }, 3000);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <View
          style={{
            display: 'flex',
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={logo}
            resizeMode={'contain'}
            style={{ width: 300, height: 130 }}
          />
        </View>
        <View>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14 }}>
            Fazer Login
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <TextInput
            keyboardType="email-address"
            placeholderTextColor={errorEmail.length > 0 ? 'red' : 'grey'}
            style={{
              color: errorEmail.length > 0 ? 'red' : 'black',
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: errorEmail.length > 0 ? 'red' : 'black',
              width: 300,
              fontFamily: 'Montserrat-Regular',
              fontSize: 13,
            }}
            placeholder={'Digite seu e-mail'}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View
          style={{
            height: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 11,
              color: 'red',
            }}>
            {errorEmail}
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <TextInput
            secureTextEntry={true}
            placeholderTextColor={errorSenha.length > 0 ? 'red' : 'grey'}
            style={{
              color: errorSenha.length > 0 ? 'red' : 'black',
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: errorSenha.length > 0 ? 'red' : 'black',
              width: 300,
              fontFamily: 'Montserrat-Regular',
              fontSize: 13,
            }}
            placeholder={'Digite sua senha'}
            value={senha}
            onChangeText={text => setSenha(text)}
          />
        </View>
        <View
          style={{
            height: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 11,
              color: 'red',
            }}>
            {errorSenha}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            width: '80%',
          }}>
          <View
            style={{
              width: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
                width: 120,
                height: 40,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.8)',
              }}>
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13 }}>
                Retornar
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => clicaProsseguir()}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
                width: 120,
                height: 40,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.8)',
              }}>
              {!isLoading ? (
                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13 }}>
                  Entrar
                </Text>
              ) : (
                <ActivityIndicator size="small" color="#000" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Login;
