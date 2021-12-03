/*
Se importan todas las librerias necesarias, los componentes a utilizar
*/
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
/*
Librerias de la base de datos para poder hacer la conexión con firebase.
*/
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
/*
Se importan los componentes a utilizar.
*/
import {Text, View, StyleSheet, Image, ActivityIndicator,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
/*
Se importa el encabezado
*/
import Header from "../../components/Headermain";

export default function Sucursales() {
	/*
	Variable para saber cual categoria de producto se ha seleccionado.
	*/
	var resultado = "";

	const navegacion = useNavigation();
	/*
	Estado necesario para poder agregar al usuario autenticado
	*/
	const [usuario, setUsuario] = useState(null);


	
	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			setUsuario(userInfo);
		});
	}, []);

	/*
	Funciones que permitiran llevarnos a la siguienter pantalla de acuerdo con la categoria del producto seleccionada.
	*/
	const consultarCategoria = () => {
		resultado = "Aretes";
		navegacion.navigate("categorias", { resultado });
	};
	const consultarCategoriaB = () => {
		resultado = "Brazaletes";
		navegacion.navigate("categorias", { resultado });
	};
	const consultarCategoriaC = () => {
		resultado = "Collares";
		navegacion.navigate("categorias", { resultado });
	};
	const consultarCategoriaD = () => {
		resultado = "Conjuntos";
		navegacion.navigate("categorias", { resultado });
	};



	return (
		<View style={styles.vista}>
			<Header />
			<Text style={styles.titulomain}>Bienvenido a la tienda online de joyería Tlacomoztli</Text>
			{/*
			Estructura necesaria para poder mostrar las cuatro categorias registradas en el base de datos, se mueatran en dos filas y dos columnas,
			la primer fila se repite dos veces y cada TouchableOpacity se le agrega el onPress, para ir a la pantalla de los productos necesarios a mostrar.
			*/}
			<View style={styles.categoria}>
				<TouchableOpacity
					style={styles.contenidocategoria}
					onPress={consultarCategoria}
				>
					<Image
						resizeMode="cover"
						PlaceholderContent={<ActivityIndicator color="#fff" />}
						source={require("../../../assets/img/arete.png")}
						style={styles.imagen}
					/>
					<Text style={styles.contenido}>Aretes </Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.contenidocategoria}
					onPress={consultarCategoriaB}
				>
					<Image
						resizeMode="cover"
						PlaceholderContent={<ActivityIndicator color="#fff" />}
						source={require("../../../assets/img/pulsera.png")}
						style={styles.imagen}
					/>
					<Text style={styles.contenido}>Pulseras </Text>
				</TouchableOpacity>
			</View>
			<View style={styles.categoria}>
				<TouchableOpacity
					style={styles.contenidocategoria}
					onPress={consultarCategoriaC}
				>
					<Image
						resizeMode="cover"
						PlaceholderContent={<ActivityIndicator color="#fff" />}
						source={require("../../../assets/img/conjunto.png")}
						style={styles.imagen}
					/>
					<Text style={styles.contenido}>Collares</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.contenidocategoria}
					onPress={consultarCategoriaD}
				>
					<Image
						resizeMode="cover"
						PlaceholderContent={<ActivityIndicator color="#fff" />}
						source={require("../../../assets/img/collar.png")}
						style={styles.imagen}
					/>
					<Text style={styles.contenido}>Conjuntos</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

/*
Estilos necesarios para poder mostra el titulo y la categoria de los productos disponibles en la tienda.
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
		flexDirection: "row",

		alignItems: "center",
		marginTop: 70,

		backgroundColor: "white",
		marginLeft: 17,
		borderRadius:8,
		
	},
	imagen: {
		width: 70,
		height: 90,
		borderRadius:8,
	},
	contenido: {
		marginLeft: 15,
		width: 70,
	},
	titulomain:{
		fontWeight:"bold",
		justifyContent:'center',
		alignItems:'center',
		alignSelf:'center',
		marginTop:50,

	}
});
