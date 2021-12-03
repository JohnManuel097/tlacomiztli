import React from 'react';
/*
Se importan las librerias  y componentes a utilizar.
*/
import { View,StyleSheet, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Header = props =>  {
    /*
    Objeto de navegación.
    */
    const navegacion = useNavigation();

    /*
    Función que nos permitira volver a la pantalla anterior.
    */
    const volverAtras = () =>{
        navegacion.goBack();

    }
    return(


        <View style={styles.container}>
             {/*
             Se pone el logo de la tienda online, al centro del encabezado.
             */}
        <Image style={styles.logo} source={require('../../assets/img/icono.png')}  />
       </View>

    );
}

/*
Estilos necesarios que nos permitiran posicionar el encabezado de una manera correcta.
*/

const styles = StyleSheet.create({

container:{

height:72,
width: '100%',
alignItems:'center',

backgroundColor:'#987845',
marginTop: 30,

flexDirection:'row'
},
logo:{
    width:72,
    height:72,
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    marginLeft:145,

},
icono:{
color:"#fff",
tintColor:"#fff",
marginLeft:15,

},

})

export default Header
