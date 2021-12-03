import React,{useRef} from "react";
//Se importa la librera toast, para ser utilizada
import Toast from "react-native-easy-toast";
import { View, Image, StyleSheet } from "react-native";
/*
Se importa el formalario de registro.
*/
import FormRegistro from "../../components/FormRegistro";
/*
Se importa el componente que nos permite que no, nos cubra los componentes al escribir.
*/
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
/*
Se importa el encabezado.
*/
import Header from "../../components/Header";
export default function Registrar() {
    //Declaración el objeto Toast que enviará las notificaciones
    const toastRef=useRef();
    return (
       <KeyboardAwareScrollView stykle={styles.fondo}>
           <Header/>
            <Image
                source={require('../../../assets/img/photologin.png')}
                resizeMethod="auto"
                style={styles.imagen}
            />
            <View style={styles.formulario} >
                {/* Se el formulario y se envia el toast a traves de la propiedad toastRef */}
                <FormRegistro toastRef={toastRef}/>
                {/* Se ubica el Toast en la posición correcta*/}
                <Toast ref={toastRef} position="top" opacity={0,9}/>
            </View>
        </KeyboardAwareScrollView>

    )



}

/*
Estilos necesarios, para mostrar los componentes, de una manera correcta.
*/
const styles = StyleSheet.create({
    imagen:{
        width:"50%",
        height:160,
        marginTop:20,
        alignSelf:'center'
    },
    formulario:{
        marginTop:40,
        marginLeft:40,
        marginRight:40,
    },
    fondo:{
        backgroundColor:"#E3E4E5"
    }
})