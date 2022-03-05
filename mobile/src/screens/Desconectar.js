import React, { useState } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/logo.png';
import firestore from '@react-native-firebase/firestore'
import { limpaAmbienteConectado } from '../store/actions/user';

function Desconectar({ navigation }) {

    const [isLoading, setLoading] = useState(false)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const deslogar = () => {

        setLoading(true)

        firestore().collection('organizacoes').doc(user.organizacaoKey).collection('usuarios-conectados').doc(user.key).delete()
        .then(() => {
            setLoading(true)
            dispatch(limpaAmbienteConectado())
        })
        .catch((err) => {
            setLoading(false)
        })
    }

    const retornaData = () => {
        let data = '' 
        
        let dataTemp = new Date(user.horarioConexao)
        let dd = dataTemp.getDate() > 9 ? `${dataTemp.getDate()}` : `0${dataTemp.getDate()}`
        let mm = (dataTemp.getMonth()+1) > 9 ? `${dataTemp.getMonth()+1}` : `0${dataTemp.getMonth()+1}`
        let year = dataTemp.getFullYear()

        let min = dataTemp.getMinutes() > 9 ? `${dataTemp.getMinutes()}` : `0${dataTemp.getMinutes()}`
        let hh = dataTemp.getHours() > 9 ? `${dataTemp.getHours()}` : `0${dataTemp.getHours()}`

        data = `${dd}/${mm}/${year} às ${hh}:${min}`

        return data

    }

    return (
        <View style={{ flex: 1, marginTop: 30 }}>
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
                            Desconectando...
                        </Text>
                    </View>
                </View>
            )}
            <View style={{ display: 'flex', alignItems: 'center' }}>
                <View
                    style={{
                        display: 'flex',
                        height: 200,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View>
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, textAlign: 'center' }}>
                            Você está em
                        </Text>
                        <View style={{ marginTop: 5, marginBottom: 15 }}>
                            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 16, textAlign: 'center' }}>
                                {user.ambienteNome}
                            </Text>
                        </View>

                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, textAlign: 'center' }}>
                            {`Acesso realizado em: ${retornaData()}`}
                        </Text>

                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => deslogar()}
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
                            Sair do ambiente
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Desconectar;
