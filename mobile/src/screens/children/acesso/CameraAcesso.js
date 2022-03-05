import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { RNCamera, FaceDetector } from 'react-native-camera';
import { useRef } from 'react';
import functions from '@react-native-firebase/functions';
import { Buffer } from 'buffer';
import fs from 'react-native-fs';
import { useDispatch } from 'react-redux';
import { setAmbienteConectado } from '../../../store/actions/user';

let timer = 10;
let timeout;

function CameraAcesso({ route, navigation }) {
  const [key, setKey] = useState('');
  const [nomeOrg, setNomeOrg] = useState('');
  const [criadorKey, setCriadorKey] = useState('');
  const [nome, setNome] = useState('');
  const [funcao, setFuncao] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isLoadingLogin, setLoadingLogin] = useState(false)

  const dispatch = useDispatch()

  const [image, setImage] = useState(null);
  const [detectandoRosto, setDetectandoRosto] = useState(true);
  const [autorizadoDeteccao, setAutorizadoDeteccao] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(10);
  const camera = useRef(null);

  useEffect(() => {
    timer = 10;
    let params = route.params;
    
    if (timeout) {
      clearTimeout(timeout);
    }

    chamaTimer();

    return () => {
      if (timeout) {
        console.log('limpou timeout');
        clearTimeout(timeout);
      }
    };
  }, []);

  const chamaTimer = () => {
    timeout = setTimeout(() => {
      if (timer > 0) {
        timer--;
        setCurrentTimer(timer);
        chamaTimer();
      } else {
        setAutorizadoDeteccao(true);
      }
    }, 1000);
  };

  const handleFaceDetection = face => {
    console.log(face);
    if (face.faces) {
      if (face.faces.length > 0) {
        setDetectandoRosto(false);
        setLoading(true);
        takePicture()
          .then(res => {
            
            let data2 = '';
            RNFetchBlob.fs
              .readStream(
                res.uri,
                'base64',
              )
              .then(ifstream => {
                ifstream.open();

                ifstream.onData(chunk => {
                  data2 += chunk;
                });

                ifstream.onEnd(() => {
                  let functionsF = functions();
                  functionsF
                    .httpsCallable('buscaFaceCollection')({ image: data2, organizacaoKey: params.criadorKey, ambienteNome: params.ambienteNome, ambienteKey: params.ambienteKey })
                    .then(res2 => {
                      console.log(res2);
                      setLoading(false);
                      if(res2.data.sucesso){
                          dispatch(setAmbienteConectado({ ...res2.data, organizacaoKey: params.criadorKey}))
                      }
                    })
                    .catch(err => {
                      console.log(err);
                      setLoading(false);
                      setImage(null);
                    });
                });
                ifstream.onError(err => {
                  console.log('oops', err);
                });
              });            
          })
          .catch(err => {
            console.log(err);
            console.log('nao tirou foto');
            setLoading(false);
          });
      }
    }
  };

  const handleErrorDetection = err => {
    console.log(err);
  };

  const takePicture = async () => {
    if (camera.current) {
      const options = { quality: 1 };
      const data = await camera.current.takePictureAsync(options);
      return data;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
      }}>
      <RNCamera
        ref={camera}
        type={RNCamera.Constants.Type.front}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        captureAudio={false}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications.all
        }
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        onFacesDetected={
          detectandoRosto && autorizadoDeteccao ? handleFaceDetection : null
        }
        onFaceDetectionError={handleErrorDetection}></RNCamera>
      {isLoading && (
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={'black'} />
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontFamily: 'Montserrat-Medium' }}>
              Foto capturada!
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontFamily: 'Montserrat-Medium' }}>
              Verificando...
            </Text>
          </View>
        </View>
      )}
      {!autorizadoDeteccao && (
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 18 }}>
              {currentTimer}
            </Text>
          </View>
          <View style={{ marginTop: 20, paddingLeft: 15, paddingRight: 15 }}>
            <Text style={{ fontFamily: 'Montserrat-Medium' }}>
              Quase pronto!
            </Text>
          </View>
          <View style={{ marginTop: 10, paddingLeft: 15, paddingRight: 1 }}>
            <Text
              style={{ fontFamily: 'Montserrat-Medium', textAlign: 'center' }}>
              Prepare-se e deixe seu rosto visível à câmera frontal...
            </Text>
          </View>
        </View>
      )}
      {image !== null && (
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{ height: 300, width: 300 }}
            source={image !== null ? { uri: image } : null}
          />
        </View>
      )}
    </View>
  );
}

export default CameraAcesso;
