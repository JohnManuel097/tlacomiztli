import React from 'react';
/*
Se importan las librerias  y componentes a utilizar.
*/
import { View,StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Icon } from 'react-native-elements';
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
            Icono de flecha que nos permitira volver a la pantalla anterior al darle clic.
            */}
      <TouchableOpacity onPress={volverAtras} style={styles.main}>
                    <Icon
                        type="material-community"
                        name="chevron-left"
                        style={styles.icono}
                        color="#fff"
                    />
      </TouchableOpacity>
      {/*
      Imagen de la tienda online, se pone centrada.
      */}
        <Image style={styles.logo} source={require('../../assets/img/icono.png')}  />
       </View>

    );
}

/*
Estilos necesarios, para poder mostrar el encabezado, correctamente.
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
main:{
height:55,
},
logo:{
    width:72,
    height:72,
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    marginLeft:105,
    

},
icono:{
color:"#fff",
tintColor:"#fff",
marginLeft:15,
marginTop:15,
},

})

export default Header
