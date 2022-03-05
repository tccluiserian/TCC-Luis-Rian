import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import firestore from '@react-native-firebase/firestore'

function ScanQR({ navigation }) {

  const [isLoading, setLoading] = useState(false)
  const [errorCodigo, setErrorCodigo] = useState('')

  const onRead = rd => {
    setLoading(true)
    firestore().collection('codigos-acesso').doc(rd.code)
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
          setErrorCodigo('Tente novamente');
          setTimeout(() => {
            setErrorCodigo('');
          }, 3000);
        }
      })
      .catch((err) => {
        setLoading(false)
        setErrorCodigo('Tente novamente');
        setTimeout(() => {
          setErrorCodigo('');
        }, 3000);
        console.log(err)
      })
  };

  return (
    <QRCodeScanner
      onRead={onRead}
      flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 15,
          }}>
          <View>
            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 12 }}>
              Aponte o celular para o QRCode desejado
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 11,
                color: 'red',
              }}>
              {errorCodigo}
            </Text>
          </View>
        </View>
      }
      bottomContent={
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            width: 180,
            height: 45,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.8)',
            marginTop: 30,
          }}>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13 }}>
            Voltar
          </Text>
        </TouchableOpacity>
      }
    />
  );
}

export default ScanQR;
