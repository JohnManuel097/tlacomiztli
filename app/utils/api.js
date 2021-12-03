/*
Libreria necesaria para poder hacer la reautenticación del  usuario.
*/
import firebase from "firebase/app";
/*
Función que nos va a permitir reautenticar al usuario, en cadso de que se haya cambiado la contraseña del usuario
que inicio sesión.
*/
export function reautenticar(password) {
  const user = firebase.auth().currentUser;
  const credentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  return user.reauthenticateWithCredential(credentials);
}