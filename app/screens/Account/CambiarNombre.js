import React, { useState } from 'react';
/*
Se importan las librerias necesarias y componentes a utilizar.
*/
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
/*
Librerias necesarias de firebase.
*/
import firebase from "firebase/app";
import 'firebase/auth';


export default function CambiarNombre(propiedades) {
    /*
    Se atrapan los datos necesarios para poder utilizarlos.
    */
    const { displayName, setShowModal, toastRef, setRealoadUserInfo } = propiedades;
    /*
    Se crean los estados para poder utilizarlos y mostrar los titulos.
    */
    const [newDisplayName, setNewDisplayName] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        setError(null);
        /*
        Se hace las validaciones necesarias, para no dejar los campos vacios.
        */
        if (!newDisplayName) {
            setError("El nombre no puede estar vacio.")
        } else if (displayName === newDisplayName) {
            setError("El nombre no puede ser igual al actual")
        } else {
            /*
            Se cambia el estado true.
            */
            setIsLoading(true);
            const update = {
                displayName: newDisplayName,
            };


            /*
            
            Se hace actualizan los datos de acuerdo con el usuario logueado.

            */
            firebase
                .auth()
                .currentUser.updateProfile(update)
                .then(() => {
                    setIsLoading(false);
                    setRealoadUserInfo(true);
                    setShowModal(false);


                })
                .catch(() => {
                    /*
                    Si ocurre un error, se le asigna el mensaje al estado.
                    */
                    setError("Error al actualizar el nombre.");
                    setIsLoading(false);

                });


        }
    };
    return (
        <View style={styles.view}>
            {/*
                Se muestra la estructura para cambiar el nombre y el botón
            */}
            <Input
                placeholder="Nombre"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2",
                }}
                defaultValue={displayName || "Nombre y apellido"}
                onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button
                title="Cambiar Nombre"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    )
}


/*
Estilos necesarios.
*/
const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    input: {

        marginBottom: 10,
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",

    },
    btn: {
        backgroundColor: "#0A6ED3",
    },
})