import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import logo from '../assets/logo.png';
import firestore from '@react-native-firebase/firestore'

function InsereCodigo({ navigation }) {
  const [codigo, setCodigo] = useState('');
  const [errorCodigo, setErrorCodigo] = useState('');
  const [isLoading, setLoading] = useState(false);

  const clicaProsseguir = () => {
    if (codigo.trim().length >= 8) {
      setLoading(true)
      firestore().collection('codigos-acesso').doc(codigo)
        .get()
        .then((res) => {
          setLoading(false)
          if (res.exists) {
            navigation.navigate('CameraAcesso', {
              criadorKey: res.data().criadorKey,
              ambienteKey: res.data().ambienteKey,
              ambientenome: res.data().ambienteNome
            });
          } else {
            setErrorCodigo('Digite um código válido');
            setTimeout(() => {
              setErrorCodigo('');
            }, 3000);
          }
        })
        .catch((err) => {
          setLoading(false)
          setErrorCodigo('Digite um código válido');
          setTimeout(() => {
            setErrorCodigo('');
          }, 3000);
          console.log(err)
        })
    } else {
      setErrorCodigo('Digite um código válido');
      setTimeout(() => {
        setErrorCodigo('');
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
            Acesso via código
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <TextInput
            style={{
              color: 'black',
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: 'black',
              width: 300,
              fontFamily: 'Montserrat-Regular',
              fontSize: 13,
            }}
            placeholder={'Digite o código de acesso'}
            value={codigo}
            onChangeText={text => setCodigo(text)}
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
            {errorCodigo}
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
                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13 }}>
                  Prosseguir
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

export default InsereCodigo;
