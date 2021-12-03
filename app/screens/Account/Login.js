import React,{useRef}  from "react";
//Se importa la librera toast, para ser utilizada
import Toast from "react-native-easy-toast";
/*
Se importan los componentes necesarios a utilizar.
*/
import {View,Text,Image, ScrollView, StyleSheet} from "react-native";
import { Divider } from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
/*
Se importa el formulario de login, para iniciar sesión, así como el encabezado.
*/
import FormLogin from "../../components/FormLogin";
import Header from "../../components/Headermain";
/*
Libreria para que el teclado no nos oculte los componentes al escribir.
*/
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function login(){
    /*
    Se crean los objetos, el de la navegación y el del toast.
    */
    const navegacion = useNavigation();
    const toastRef=useRef();
return(
    <KeyboardAwareScrollView style={styles.fondo}>
        {/*
        Se encierra todo en el KeyboardAwareScrollView, para que no oculte los componentes al escribir.
        */}
<ScrollView >
    {/*
    Se pone el encabezado, personalizado.
    */}
    <Header/>
    {/*
    Se pone una imagen referente a la tematica de la tienda online.
    */}
<Image 
source={require("../../../assets/img/photologin.png")
}
resizeMethod="auto"
style={styles.usuario}
/>
<View style={styles.contenedor}>
    {/*
    Se inserta el formulario.
    */}
    <FormLogin toastRef={toastRef}/>
     {/* Se ubica el Toast en la posición correcta*/}
     <Toast ref={toastRef} position="top" opacity={0,9}/>
    <CrearCuenta/>

</View>
<Divider style={styles.divider}/>



</ScrollView>
</KeyboardAwareScrollView>
);

/*
Función que nos manda a crear una cuenta en caso de que no se cuenta con una cuenta.
*/
function CrearCuenta(){
    return (
        <Text style={styles.textRegistrar}>
            ¿Si aún no tienes cuenta?{" "}
            <Text
            style={styles.link}
            onPress={()=>navegacion.navigate("Registrar")}>
                Regístrate
            </Text>
        </Text>
    );
}
}

/*
Estilos necesarios para poder mostrar los componentes de una manera correcta.
*/
const styles = StyleSheet.create({
    usuario: {
        width:"50%",
        height:160,
        marginTop:20,
        alignSelf:'center'
    },
    contenedor: {
        marginRight:40,
        marginLeft:40,
        marginTop:-20,
      
    },
    textRegistrar: {
        marginTop:15,
        marginLeft:10,
        marginRight:10,
        fontWeight:"bold",
        alignSelf:'center'
    },
    link: {
        color:"white",
        fontWeight:"bold",
        marginLeft:20,
      
    },
    divider: {
        backgroundColor:"#0A6ED3",
        margin:40,
    },
    fondo:{
        backgroundColor: "#E3E4E5"
    }
})