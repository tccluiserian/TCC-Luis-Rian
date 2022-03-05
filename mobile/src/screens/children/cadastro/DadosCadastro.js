import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import logo from '../../../assets/logo.png';
import { useState, useEffect } from 'react';

function DadosCadastro({ route, navigation }) {
  const [key, setKey] = useState('');
  const [nomeOrg, setNomeOrg] = useState('');
  const [criadorKey, setCriadorKey] = useState('');
  const [nome, setNome] = useState('');
  const [errorNome, setErrorNome] = useState('');
  const [funcao, setFuncao] = useState('');
  const [errorFuncao, setErrorFuncao] = useState('');
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [errorMatricula, setErrorMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [errorSenha, setErrorSenha] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let params = route.params;
    setKey(params.key);
    setNomeOrg(params.criadorNome);
    setCriadorKey(params.criadorKey);
  }, [route.params]);

  const clicaProsseguir = () => {
    let nomeOk = nome.length > 9;
    let funcaoOk = funcao.trim().length >= 3;
    let emailOk = email.length >= 7 && email.includes('@') && email.includes('.');
    let matriculaOk = matricula.length > 4;

    if (nomeOk && funcaoOk && emailOk && matriculaOk) {
      //setLoading(true);
      setErrorNome('');
      setErrorFuncao('');
      setErrorEmail('');
      setErrorMatricula('');
      
        navigation.navigate('CameraCadastro', { nome: nome, funcao: funcao, email: email, matricula: matricula, criadorNome: nomeOrg, key: key, criadorKey: criadorKey })

    } else {
      if (!nomeOk) {
        setErrorNome('Campo necessário');
      }
      if (!funcaoOk) {
        setErrorFuncao('Campo necessário');
      }
      if (!emailOk) {
        setErrorEmail('Verifique seu e-mail e tente novamente');
      }
      if (!matriculaOk) {
        setErrorMatricula('Campo necessário');
      }
      
      clearTimeout();
      setTimeout(() => {
        setErrorNome('');
        setErrorFuncao('');
        setErrorEmail('');
        setErrorMatricula('');
      }, 3000);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
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
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: 14,
              }}>{`Cadastrando na organização '${nomeOrg}'`}</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <TextInput
              placeholderTextColor={errorNome.length > 0 ? 'red' : 'grey'}
              style={{
                color: errorNome.length > 0 ? 'red' : 'black',
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: errorNome.length > 0 ? 'red' : 'black',
                width: 300,
                fontFamily: 'Montserrat-Regular',
                fontSize: 13,
              }}
              placeholder={'Digite seu nome'}
              value={nome}
              onChangeText={text => setNome(text)}
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
              {errorNome}
            </Text>
          </View>
          <View>
            <TextInput
              placeholderTextColor={errorFuncao.length > 0 ? 'red' : 'grey'}
              style={{
                color: errorFuncao.length > 0 ? 'red' : 'black',
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: errorFuncao.length > 0 ? 'red' : 'black',
                width: 300,
                fontFamily: 'Montserrat-Regular',
                fontSize: 13,
              }}
              placeholder={'Digite sua função'}
              value={funcao}
              onChangeText={text => setFuncao(text)}
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
              {errorFuncao}
            </Text>
          </View>
          <View>
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
          <View>
            <TextInput
              placeholderTextColor={errorMatricula.length > 0 ? 'red' : 'grey'}
              style={{
                color: errorMatricula.length > 0 ? 'red' : 'black',
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: errorMatricula.length > 0 ? 'red' : 'black',
                width: 300,
                fontFamily: 'Montserrat-Regular',
                fontSize: 13,
              }}
              placeholder={'Digite sua matrícula'}
              value={matricula}
              onChangeText={text => setMatricula(text)}
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
              {errorMatricula}
            </Text>
          </View>
          <View>
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
          <View style={{ marginTop: 10, paddingLeft: 30, paddingRight: 30 }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                textAlign: 'center',
              }}>
              {
                'Ao prosseguir, você será redirecionado à tela para captação de seus pontos faciais'
              }
            </Text>
          </View>
          <View
            style={{
              marginTop: 30,
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
                  Voltar
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
                  <Text
                    style={{ fontFamily: 'Montserrat-Medium', fontSize: 13 }}>
                    Prosseguir
                  </Text>
                ) : (
                  <ActivityIndicator size="small" color="#000" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}

export default DadosCadastro;
