/*
Se importan todas las librerias necesarias para poder hacer la autenticación del usuario,
que se encuentra registrado en la base de datos.
*/
import React from 'react'
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseApp } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);


/*
Función que nos va a permitir cerrar la sesión del usuario que haya iniciado sesión.
*/
export const closeSession = () =>{

    return firebase.auth().signOut()
}
