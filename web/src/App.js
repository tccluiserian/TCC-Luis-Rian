import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthRouter from "./routers/auth/AuthRouter";
import firebase from './firebase'
import { deslogar } from "./store/actions/user";
import { fetchAmbientes } from "./store/actions/ambientes";
import { fetchUsuarios } from "./store/actions/usuarios";
import { fetchLogs } from "./store/actions/logs";
import { fetchChavesCadastro } from "./store/actions/chaves-cadastro";
import { fetchUsuariosConectados } from "./store/actions/usuarios-conectados";

export default function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    let subscribe = firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        setTimeout(() => {
          dispatch(deslogar())
        }, 2000)
      }else{
        dispatch(fetchAmbientes())
        dispatch(fetchUsuarios())
        dispatch(fetchLogs())
        dispatch(fetchChavesCadastro())
        dispatch(fetchUsuariosConectados())
      }
    })

    return () => {
      subscribe()
    }

  },[])

  return (
    <AuthRouter />
  );
}