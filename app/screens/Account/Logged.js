/*
Se importan las librerias necesarias, asi como los componentes necesarios a utilizar.
*/
import React, { useState, useRef, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Toast from "react-native-easy-toast";
import firebase from "firebase/app";
/*
Se importan las pantallas necesarias a utilizar, asi como la navegación.
*/
import InfoUsuario from "./InfoUsuario";
import OpcionesCuenta from "./OpcionesCuenta";
import Header from "../../components/Headermain";
import { useNavigation } from "@react-navigation/native";
import { closeSession }from "../../utils/actions";
export default function Logged() {
    /*
    Se crea el objeto de la navegación, así como los estados necesarios, para poder cargar la información del usuario.
    */
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState(null);
    const [realoadUserInfo, setRealoadUserInfo] = useState(false)
    const [cargando, setCargando] = useState(false)
    const toastRef = useRef();
    /*
    Se atrapa la información del usuario logueado.
    */
    useEffect(() => {
        (async () => {
            const user = firebase.auth().currentUser;
            setUserInfo(user);

        })();
        setRealoadUserInfo(false);
    }, [realoadUserInfo])




    return (

        <View style={styles.viewUserInfo}>
            <Header/>
            <Text style={styles.perfil}>Perfil del Usuario</Text>
            {/*
            Se hace la validación que nos permite mostrar las opciones para poder cambiar la información del usuario,
            en caso de que este logueado
            */}
            {
            userInfo && (
                <View style={styles.info}>
                    {/*
                    Componente de información del usuaro y se le pasan los parametros necesarios.
                    */}
                <InfoUsuario
                    userInfo={userInfo}
                    toastRef={toastRef}
                    setCargando={setCargando}
                />
                {/*
                    Componente de opciones cuenta que contine las opciones para poder cambiar la información del usuario.
                    */}
                <OpcionesCuenta
                userInfo={userInfo}
                toastRef={toastRef}
                setRealoadUserInfo={setRealoadUserInfo}
            />
            </View>
               

            )
            
    }

<View>
            


             {/*
             Boton que nos permite cerrar la sesión del usuario actual, y cuando se cierre se redirecciona a la pantalla de login.
             */}
            <TouchableOpacity
                onPress={() =>{
                    closeSession()
                    navigation.navigate("login")
                }}
                
                style={styles.btn}
           >
                <Text style={styles.texto}>
                    Cerrar Sesión
                </Text>
               </TouchableOpacity> 

           
            <Toast ref={toastRef} position="center" opacity={0, 9} />
            </View>
        </View>
    );
}
/*
Estilos necesarios para poder mostrar los componentes de manera correcta.
*/
const styles = StyleSheet.create({

    viewUserInfo: {

        minHeight: "100%",
      
        backgroundColor: "#f2f2f2",
    },
    btn:{
        backgroundColor:"#987845",
        alignItems:'center',
        height:40,
    },
    texto:{
        color:"#fff",
        alignSelf:'center',
        margin:6,
    },
    perfil:{
alignSelf:'center',
marginTop:20,
fontWeight:"bold",
fontSize:18,
    }


})