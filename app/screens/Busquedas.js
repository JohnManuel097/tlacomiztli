/*
Librerias necesarias para poder utilizar los estados, hacer la conexión a la base de datos, así como la libreria firesql,
que nos permitira hacer consultas a la base de datos, en una sintaxis la cual maneja mysql
*/
import React, { useState, useEffect } from 'react';
import { firebaseApp } from '../utils/firebase'
import firebase from 'firebase/app';
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
import { FireSQL } from 'firesql';
const fireSQL = new FireSQL(firebase.firestore(), { includeId: "Id" })
/*
Componentes necesarios para hacer la busqueda de cualquier producto.
*/
import { Text, View, StyleSheet, ActivityIndicator, FlatList, Image,TouchableOpacity } from 'react-native';
//Se importa el searchbar
import { SearchBar, ListItem, Icon } from 'react-native-elements';
//Se importa la navegción, por si hay un resultado, al darle clic al producton nos lleve a la pantalla para agregar al carrito.
import { useNavigation } from '@react-navigation/native';

//Librerias necesarias para validaciones.
import {  isEmpty, size } from 'lodash';
//Se importa la navegación
import Header from '../components/Headermain';



export default function Busquedas({ navigation }) {
  //Se importa la navgeación y los estados necesarios
  const navegacion = useNavigation();
  const [search, setSearch] = useState("");
  const [productos, setProductos] = useState([]);
  //Se hace la validación para que siempre se trate de buscar un producto.
  useEffect(() => {
    if (isEmpty(search)) {
      return

    }

    /*
    Función que nos va a permitir obtener los productos que se encontraron, en caso de que haya algún resultado.
    */
    async function getData() {
      const response = await searchProductos(search);
      console.log(response)
      if (response.statusResponse) {
        setProductos(response.productos);
      }
    }
    getData();
  }, [search])





  return (
    <View style={styles.fondo}>
      {/* Se pone el encabezado */}
      <Header/>
      {/* Se pone la barra de navegación*/}
      <SearchBar
        placeholder="Ingresa el nombre de la joya"
        onChangeText={(e) => setSearch(e)}
        containerStyle={styles.searchBar}
        value={search}
      
        iconStyle={{backgroundColor:'#fff'}}
        reverseColor='#fff'
        placeholderTextColor='#fff'
      />
      <Text style={styles.titulo}>Busqueda</Text>
      {/* Se hace la validación, si hay resultados en la busqueda, se nos muestran en forma de lista,
      por pantalla, en caso de ue no, se muestra una imagen personalizada de la tienda, diciendo que no se encontraron
      resultados. */}
      {

        size(productos) > 0 ? (
          <FlatList
            data={productos}
            renderItem={(producto) => <Producto producto={producto} navigation={navigation} />}
            keyExtractor={(item, index) => index.toString()}
            
          />

        ) : (
          /*
          Se hace la validación, por si la aplicación va inciando, se sabe que no hay busqueda aún, por lo tanto,
          se muestram imagenes y texto que permitiran al usuario, saber cuales categorias de joyas hay en la tienda, caso
          contrario se mostrara la imagen de resultados no encontrados, ya que se se procedio a buscar algpun producto y no 
          se encontro nada.
          */
          isEmpty(search) ? (
            <View style={styles.vista}>
          
            <View style={styles.categoria}>
         
              <View style={styles.contenidocategoria}>
                <Image
                  resizeMode="cover"
                  PlaceholderContent={<ActivityIndicator color="#fff" />}
                    source={require("../../assets/img/arete.png")}
                    style={styles.imagen}
                />
              <Text style={styles.contenido}>Aretes </Text>
              
              </View>
             
             
              <TouchableOpacity style={styles.contenidocategoria}>
                <Image
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                  source={require("../../assets/img/pulsera.png")}
                  style={styles.imagen}
                />
              <Text style={styles.contenido}>Pulseras </Text>
             
              </TouchableOpacity>
             
            </View>
            <View style={styles.categoria}>
            <TouchableOpacity style={styles.contenidocategoriados} >
                <Image
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                  source={require("../../assets/img/conjunto.png")}
                  style={styles.imagen}
                />
                  <Text style={styles.contenido}>Collares</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contenidocategoriados}>
                <Image
                  resizeMode="cover"
                  PlaceholderContent={<ActivityIndicator color="#fff" />}
                    source={require("../../assets/img/collar.png")}
                    style={styles.imagen}
                />
            <Text style={styles.contenido}>Conjuntos</Text>
              </TouchableOpacity>
            </View>
          </View>
          ) : (
            <Image
              resizeMode="cover"
              source={require('../../assets/img/sin-resultados.png')}
              style={styles.nonencontrado}
            />
          )
        )
      }
    </View>
  );
}

/*
Función que nos va a permitir buscar los productos, y nos devuelve el resultado de la busqueda.
*/
async function searchProductos(criterio) {
  const result = { statusResponse: true, error: null, productos: [] }
  try {
    result.productos = await fireSQL.query(`SELECT * FROM Productos WHERE nombre LIKE '${criterio}%'`)

  } catch (error) {
    result.statusResponse = false
    result.error = error

  }
  return result


}



function Producto(propiedades, navigation) {
  /*
  Se reciben los resultados encontrados.
  */
  const { producto } = propiedades;
  var id = "";
  /*
  Se atrapan los elementos a mostrar.
  */
  const { image, nombre, Id,precio,categoria,cantidad } = producto.item;
  id = Id;
  /*
  Se crea el objeto de la navegación 
  */
  const navegacion = useNavigation();



/*
Estructura con la cual se mostraran los productos encontrados en la busquerda.
*/
  return (
    <View style={styles.fondo}>
      
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() =>
        navegacion.navigate("viewdetail", { id, nombre,image,precio,categoria,cantidad })
      }
    >
      <Image
        resizeMode="cover"
        PlaceholderContent={<ActivityIndicator color="#fff" />}
        source={{ uri: image }}
        style={styles.imagenProducto}
      />
      <ListItem.Content >
        <ListItem.Title ><Text style={styles.texto}>Nombre: {nombre}</Text></ListItem.Title>
        <Text style={styles.espacio}></Text>
        <ListItem.Title><Text style={styles.texto}>Precio: {precio} MXN</Text></ListItem.Title>
      
      </ListItem.Content>
      <Icon
        type="material-community"
        name="chevron-right"
        style={styles.icono}
      />

    </TouchableOpacity>
    </View>
  )


}


/*

Estilos necesarios, para poder mostrar todos los elementos correctamente, en caso de que haya o no resultados, 
en la busqueda de algún producto.
*/

const styles = StyleSheet.create({
  searchBar: {

    marginBottom: 20,
    backgroundColor: "#E3E4E5",
  
    
  },
  imagenProducto: {
    width: 90,
    height: 90,
    marginRight:5,
  },
  notfound: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#E3E4E5",
  },
  menuItem: {
    margin: 10,
    flexDirection:'row',
    backgroundColor: "#E3E4E5",
  },
  nonencontrado:{
    width: 350,
    height: 350,
    margin: 10,
    backgroundColor: "#E3E4E5",
  },
  texto:{
    fontSize:14,
    backgroundColor: "#E3E4E5",
    

  },
  imagen: {


    width:70,
    height:90
  },
  btncomprar:{
		
		
		
		color:"#fff",
		alignSelf: 'center',
    marginLeft:2,
	},
	ajustar:{

		backgroundColor:'#987845',
		borderRadius:5,
		width:70,
		padding:3,
    marginTop:15,
    marginLeft:2,
  
		
		
	},
  espacio:{
    marginTop: -12,
    backgroundColor: "#E3E4E5",
  },
  icono:{
    marginTop:30,

  },
  vista: {
		flex: 1,
		backgroundColor: "#E3E4E5",
		flexDirection: "column",
	},
  categoria: {
		flexDirection: "row",
	},
	contenidocategoria: {
flexDirection: 'row',

alignItems: 'center',
marginTop:32,

backgroundColor: 'white',
marginLeft:17,
  },
  contenidocategoriados: {
    flexDirection: 'row',
    
    alignItems: 'center',
    marginTop:123,
    
    backgroundColor: 'white',
    marginLeft:17,
      },
  contenido:{
    marginLeft:15,
    width:70,

  },
  fondo:{
    height:"100%",
    backgroundColor: "#E3E4E5",
  },
  titulo:{
		textAlign:'center',
		padding:5,
		fontWeight: "bold"
	}
})