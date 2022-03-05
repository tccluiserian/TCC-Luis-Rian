/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import logo from '../../../assets/logo.png';
import { useState, useEffect } from 'react';

function ConfirmaCadastro({ route, navigation }) {
  const [key, setKey] = useState('');
  const [nomeOrg, setNomeOrg] = useState('');
  const [criadorKey, setCriadorKey] = useState('');

  useEffect(() => {
    let params = route.params;
    setKey(params.key);
    setNomeOrg(params.criadorNome);
    setCriadorKey(params.criadorKey);
  }, [route.params]);

  const clicaProsseguir = () => {
    navigation.navigate('DadosCadastro', {
      key: key,
      criadorNome: nomeOrg,
      criadorKey: criadorKey,
    });
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
        <View
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 14,
              textAlign: 'center',
            }}>
            Ao prosseguir, você realizará cadastro na organização:
          </Text>
          <View style={{ paddingTop: 15 }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: 16,
                textAlign: 'center',
              }}>
              {nomeOrg}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 25,
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
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13 }}>
                Prosseguir
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ConfirmaCadastro;
