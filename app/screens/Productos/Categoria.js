/*

Se importan todos las librerias necesarias y las librerias de firebasen para pode hacer la conexión a la base de datos,
para poder mostrar las librerias de la base de datos.
*/
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

/*
Librerias necesarias para poder hacer la conexión a la base de datos.
*/
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
const db = firebase.firestore(firebaseApp);
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
/*
Se importa la lista de los productos y el encabezado.
*/
import ListaProductos from "../../components/Productos/ListaProductos";
import Header from "../../components/Header";
/*
Libreria para poder hacer consultas a la base de datos, en formato que usa mysql*/
import { FireSQL } from 'firesql';
const fireSQL = new FireSQL(firebase.firestore(), { includeId: "Id" })
export default function Productos(propiedades) {
	/*
	Se reciben las propiedades que se envian a esta pantalla de categoria
	*/
    const { route } = propiedades;
    const { resultado } = route.params;
	/*
	Estados necesarios para poder listar los productso por categoria.
	*/
	const navegacion = useNavigation();

	const [usuario, setUsuario] = useState(null);

	const [productos, setProductos] = useState([]);

	const [totalSuc, setTotalSuc] = useState(0);

	const [puntero, setPuntero] = useState(null);


	/*
	Se hace la consulta a la base de datos, de la categoria seleccionada, y se pone en un useFocusEffect y useCallback
	para que cada que se de click se ejecuta la consulta y se muestren los productos automaticamente.
	*/
	useFocusEffect(
		useCallback(() => {
			db.collection("Productos")
				.get()
				.then((res) => {
					setTotalSuc(res.size);
				});
			const arrProductos = [];
			db.collection("Productos")
				.get()
				.then((res) => {
					setPuntero(res.docs[res.docs.length - 1]);
					res.forEach((doc) => {
						const productos = doc.data();
						productos.id = doc.id;
						/*
						Se hace la comparación para solo agregar al arreglo los productos de la categoria seleccionada.
						*/
                        if(productos.categoria == resultado ){

                            arrProductos.push(productos);

                        }
					
                        
					});
					/*
					Se agregan los productos al estado
					*/
					setProductos(arrProductos);
				});
		}, [])
	);

	/*
	Se hacen la validación del usuario.
	*/
	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			setUsuario(userInfo);
		});
	}, []);
 
	/*
	Se retorna el encabezado y la lista de los productos por categoria.
	*/
	return (
		<View style={styles.vista}>
			<Header/>
			<ListaProductos productos={productos} resultado={resultado} />
		</View>
	);
}
/*
Estilos necesarios para poder mostrar losn productos por categoria.
*/
const styles = StyleSheet.create({
	vista: {
		flex: 1,
		backgroundColor: "#E3E4E5",
		flexDirection: "column",
	},

	btn: {
		position: "absolute",
		bottom: 10,
		right: 10,
		shadowColor: "black",
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.5,
	},
	categoria: {
		flexDirection: "row",
	},
	contenidocategoria: {
flexDirection: 'row',

alignItems: 'center',
marginTop:115,

backgroundColor: 'white',
marginLeft:17,
  },
	imagen: {


    width:70,
    height:90
  },
  contenido:{
    marginLeft:15,
    width:70,

  }
 
});
