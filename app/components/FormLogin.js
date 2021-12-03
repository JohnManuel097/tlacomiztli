import React, {useState} from "react";
/*
Se importan las librerias y componentes a utilizar.
*/
import { useNavigation } from "@react-navigation/native";
import {StyleSheet,View,Text} from "react-native";
import {Input, Icon, Button} from "react-native-elements";
import {validarEmail} from "../utils/validaciones";
import { isEmpty } from "lodash";
//Se importa la librería de firebase
import firebase from "firebase";
import 'firebase/auth';

export default function FormRegistro(toast){
    //Se tiene que declarar el objeto con el cual se gestiona el toast(mensaje en pantalla)
    const {toastRef}=toast;
    const [mostrar, setMostrar]=useState(false);
    const navigation = useNavigation();
    const [valor, setValor] = useState("")
    /*
    La variable datos almacena los valores del objeto que
    estan definidos en la funció valoresDefault, que 
    son los campos del formulario, con setDatos se puede 
    definir otros valores
    */
    const [datos, setDatos]=useState(valoresDefault);
    /*
    Este metodo entrara en ejecución cuando se le de clic al boton
    de registrar del formulario de registro e imprime los datos en 
    consola.
    */
    const onSubmit = () => {
        //Se corrobora que los campos no se guarden vacios
       if(isEmpty(datos.email) || isEmpty(datos.password)){
        //Se imprime el mensaje correspondiente a traves del Toast
        toastRef.current.show("No puedes dejar campos vacios");
       }
       //Se comprueba que el email se escriba correctamente
       else if(!validarEmail(datos.email)){
           //Se imprime el mensaje correspondiente a traves del Toast
        toastRef.current.show("Estructura del email incorrecta");
       }    
       //Si los datos del formulario que se van a enviar son correctos se envian los resultados por consola
       else{
           /* 
           Se utiliza el objeto firebase y el metodo auth para hacer la autenticación,
           por contraseña e email, con la función createUserWithEmailAndPassword se le pasa
           el email y como otro argumento el passowrd, cualquier respuesta referente al registro
           en la base de datos, se imprime en consola, en caso de que ocurra algún error, se atrapa
           con un catch y también se imprime en consola.
           */
        firebase.auth().signInWithEmailAndPassword(datos.email,datos.password)
        .then(respuesta =>{
           
         navigation.navigate("puente");
        
        })
        .catch(err =>{
            toastRef.current.show("email o contraseña incorrecta")
        });
       }
    };

    /* 
    Función que se pone en funcionamiento cuando se empieza a escrbir
    en los campos del formulario de registro, y ...datos cambiara 
    los datos del formulario y con setDatos se asignan al state y 
    finalmente en el segundo paramtero snos devuelve el texto del input
    en el cual se esta escribiendo
    */
    const onChange = (e, type) => {
        setDatos({...datos,[type]:e.nativeEvent.text});



    };
return(
    <View style={styles.formContainer}>
        <Input 
        placeholder="Correo Electronico" 
        containerStyle={styles.inputForm}
        /* 
        Con este metodo, lo que hacemos es cambiar 
        el valor del campo, en este caso de email
        */
        onChange={(e)=> onChange(e,"email")}
   
        rightIcon={
            <Icon
            type="material-community-icon"
            name="alternate-email"
            iconStyle={styles.icono}
            />

        }
        />
        <Input 
        placeholder="Contraseña" 
        containerStyle={styles.inputForm}     
        password={true} 
   
        secureTextEntry={mostrar?false:true}
        /* 
        Se agrega la propiedad onChange, para utilizar 
        el metodo onChange que me permitira cambiar el 
        valor del campo de contraseña
        */
        onChange={(e)=> onChange(e,"password")}
        rightIcon={
            <Icon
            type="material-community-icon"
            name={mostrar?"visibility":"visibility-off"}
            iconStyle={styles.icono}
            onPress={() =>setMostrar(!mostrar)}
            />

        }
        />
        <Button 
            title="Iniciar Sesión"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            /*Se agrega la propiedad onPress que nos permitira 
            Guardar los datos del formulario, por el momento solo 
              imprimir en consola*/
            onPress={onSubmit}
        />



    </View>
)}

/*
Funcion con los valores por defecto del formulario,
la funcion retorna un objeto vacio, de cada uno de 
los campos del formulario
*/
function valoresDefault(){
    return{
        email:"",
        password:"",
        

    };


}




const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginTop:30,
    },
    inputForm:{
        width:"100%",
        marginTop:20,
    },
    btnContainer:{
        marginTop:20,
        width:"100%",
    },
    btn:{
        backgroundColor:"#987845"
    },
    icono:{

        color:"#c1c1c1"

    },
})