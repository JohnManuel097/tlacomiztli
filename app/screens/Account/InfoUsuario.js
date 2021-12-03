/*
Se importan las librerias necesarias y las librerias de firebasebase para poder cambiar datos del usuario o cerrar sesión.
*/
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import firebase from "firebase/app";
import "firebase/storage";
/*
Se importa la libreria para cambiar la foto del usuario.
*/
import { Avatar } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";


export default function InfoUsuario(propiedades) {
    /*
    Se reciben los datos necesarios.
    */
    const {  userInfo : { uid, photoURL, displayName, email },
        toastRef,
        setCargando,
    } = propiedades;

    /*
    Función que nos va a permitir cambiar la foto del usuario.
    */
    const cambiarAvatar = async () => {
        const resultPermiso = await Permissions.askAsync(
            Permissions.MEDIA_LIBRARY
        );
        /*
        Se atrapa la solicutud de permiso del usuario, para saber si nos permite acceder a su galaeria y si nos permite se
        cambia la imagen, caso contrario, se le muestra el un mensaje al usuario por pantalla.
        */
        const solicitudPermiso = resultPermiso.permissions.mediaLibrary.status;
        if (solicitudPermiso === "denied") {
            toastRef.current.show("Es necesario aceptar los permisos de la galeria");


        } else {
            /*
            Se abre la libreria y se escoge la imagen y se actualiza
            */
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });

            if (result.cancelled) {
                toastRef.current.show("Has cerrado la selección de imagenes");
            } else {
               
                subirImagen(result.uri)
                    .then(() => {
                        /*
                        Se actualiza la imagen en la base de datos.
                        */
                        updatePhotoUrl();

                    })
                    .catch(() => {
                        /*
                        Si ocurre un error se le envie el mensaje al usuario por pantalla.
                        */
                        toastRef.current.show("Error al actualizar el avatar");
                    });
            }

           




        }

    };
    /*
    Función que nos permite cambiar la imagen del usuario en la base de datos y se guarda en el storage, en la carpeta avatar.
    y se retorna el resultado.
    */
    const subirImagen = async (uri) => {
        setCargando(true);
        toastRef.current.show("Realizando cambios...");
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`avatar/${uid}`)
        return ref.put(blob);





    };


    /*
    Función que nos permite actualizar la imagen del usuario en su perfil, de acuerdo con el usuario logueado.
    */
    const updatePhotoUrl = () => {
        firebase
            .storage()
            .ref(`avatar/${uid}`)
            .getDownloadURL()
            .then(async (response) => {
                const update = {
                    photoURL: response,

                };
                /*
                Se actualiza la información del usuario.
                */
                await firebase.auth().currentUser.updateProfile(update);
                setCargando(false);

            })
            .catch(() => {
                /*
                Si ocurre algún error, se le mande el mensaje al usuario por pantalla.
                */
                toastRef.current.show("Error al actualizar el avatar.");
            });
    };



    return (

        <View style={styles.viewUserInfo}>
            {/*Se muestra el avatar(imagen) en forma de circulo. */}
            <Avatar
                rounded
                size="large"
                onPress={cambiarAvatar}
                containerStyle={styles.userInfoAvatar}
                source={
                    photoURL
                        ? { uri: photoURL }
                        : require("../../../assets/img/avatar-default.jpeg")}>
                <Avatar.Accessory size={24} />

            </Avatar>
            {/*
            Datos del usuario por pantalla.
            */}
            <View>
                <Text style={styles.displayName}>
                    {displayName ? displayName : "Anónimo"}
                </Text>
                <Text>{email ? email : "Login Social"}</Text>

            </View>

        </View>
    );
}



/*
Estilos necesarios, para mostrar correctamente todos los componentes.
*/
const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems:"center",
        justifyContent:"center",
        justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"#f2f2f2",
        paddingTop:30,
        paddingBottom:30,

    },
    userInfoAvatar: {
        marginRight:20,

    },
    displayName: {
        fontWeight:"bold",
        paddingBottom:5,
    },


})