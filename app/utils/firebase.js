/*
Libreria se firebase necesaria, para poder hacer la conexión a la base de datos.
*/
import firebase from "firebase/app";
/*
Credenciales necesarias para poder hacer la conexión a la base de datos.
*/
const firebaseConfig = {
  apiKey: "AIzaSyCXmetIao02oTtGES4X0PdnjBIprjwEMVI",
  authDomain: "tlacomiztli-43383.firebaseapp.com",
  projectId: "tlacomiztli-43383",
  storageBucket: "tlacomiztli-43383.appspot.com",
  messagingSenderId: "511195487439",
  appId: "1:511195487439:web:3b479be130d509a2356bba"
};

/*
Se exporta la conexión o aplicación de firebase realizada de manera correcta.
*/
export const firebaseApp = firebase.initializeApp(firebaseConfig);
