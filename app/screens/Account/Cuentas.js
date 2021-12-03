/*
Se importan las librerias necesarias y las librerias de firebase para saber si el usuario esta logueado o no.
*/
import React,  {useState, useEffect} from 'react';
import firebase from "firebase/app";
import 'firebase/auth';
/*
Se importa la pantalla necesaria.
*/
import Logged from "./Logged";
import { Text} from 'react-native';

export default function Cuentas() {
  /*
  Estado para saber si se ha iniciado sesión.
  */
  const [login,setLogin]=useState(null);


  /*
  Se hace la autenticacoón del usuario.
  */
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user) =>{
      !user ? setLogin(false): setLogin(true);


    });


  },[]);
  /*
  Se redirecciona al usuario a al pantalla correspondiente de acuerdo si se ha iniciado sesión o no.
  */
  if(login === null) return <Text>Cargando...</Text>;
  return login ? <Logged/>: <Text>Proximamente...</Text>;
}