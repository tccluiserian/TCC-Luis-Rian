import React from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';

function Inicial({ navigation }) {
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
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Scan')}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              width: 200,
              height: 55,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.8)',
            }}>
            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 15 }}>
              Acesso via QRCode
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Codigo')}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              width: 200,
              height: 55,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.8)',
            }}>
            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 15 }}>
              Acesso via código
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cadastro')}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              width: 200,
              height: 55,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.8)',
            }}>
            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 15 }}>
              Cadastrar
            </Text>
          </TouchableOpacity>
        </View>        
      </View>
    </View>
  );
}

export default Inicial;
