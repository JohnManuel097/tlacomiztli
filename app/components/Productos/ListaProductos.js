import React from "react";
/*
Se importan las librerias y componentes a utilizar, asi como la libreria de la navegación.
*/
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function ListaProductos(propiedades) {
	/*
	Se reciben las propiedades necesarias.
	*/
	const { productos, resultado } = propiedades;
	
	return (
		<View>
			 {/*
			 Hace la validación, para saber si hay productos y mostrarlos, en caso de que no haya productos,
			 con un ActivityIndicator se muestra un mensaje, que nos dice que se estan cargando los productos,
			 de la joyeria.
			 */}
			<Text style={styles.titulo}>Categoria: {resultado}</Text>
			{size(productos) > 0 ? (

				<FlatList
					data={productos}
					renderItem={(productos) => <Products productos={productos} />}
					keyExtractor={(item, index) => index.toString()}
				/>
			) : (
				<View style={styles.productos}>
					<ActivityIndicator size="large" color="#0000ff" />
					<Text>Cargando Productos</Text>
				</View>
			)}
		</View>
	);
}

function Products(propiedades) {
	/*
	Se reciben las propiedades necesarias 
	*/
	const { productos } = propiedades;
	const { image, nombre, categoria, cantidad, precio, id } = productos.item;
	/*
	Se crea un objeto de  la navegación.
	*/
	const navegacion = useNavigation();




	/*
	Función que nos permite navegar a la pantalla, de detalle del producto y se le envia la información necesaria.
	*/
	const Detalle = () => {
	
		navegacion.navigate("viewdetail",{nombre,categoria,precio,id,image,cantidad})
	};
	return (
		<ScrollView>
			<TouchableOpacity onPress={Detalle}>
				{/*
				Imagenes del producto por categoria.
				*/}
			<Image
				resizeMode="cover"
				PlaceholderContent={<ActivityIndicator color="#0000ff" />}
				source={
					image[0]
						? { uri: image }
						: require("../../../assets/img/no-encontrado.png")}
				style={styles.imagen}
			/>
			<View style={styles.lista}>

				<View style={styles.viewImagen}>


				</View>
				<View>
					{/*
					Se muestran los componentes necesarios del producto.
					*/}
					<Text style={styles.nombre}>Nombre: {nombre}</Text>
					<Text style={styles.separar}></Text>
					<Text style={styles.descripcion}>Precio: {precio}</Text>
					<Text style={styles.categoria}>Categoria: {categoria}</Text>
					
				</View>
			</View>
			</TouchableOpacity>
		</ScrollView>
	);

	
}

/*
Estilos necesarios, que nos permitiran mostrar los productos por categoria, correctamente.
*/
const styles = StyleSheet.create({
	productos: {
		marginTop: 10,
		marginBottom: 10,
		alignItems: "center",
	},
	nombre: {
		fontWeight: "bold",
		marginTop:-75,
		textAlign:'justify',
		width:150,

	},
	direccion: {
		paddingTop: 2,
		color: "grey"

	},
	categoria: {
		paddingTop: 2,
		color: "grey",
		marginBottom:20,

	},
	lista: {
		flexDirection: "row",
		marginLeft:90,

	},
	viewImagen: {
		marginRight: 15,
	},
	imagen: {
		width: 150,
		height: 100,
		alignSelf:'center',
		alignItems:'center',
		alignContent:'center',
		position:'relative',

	},
	
	descripcion: {
		paddingTop: 2,
		color: "grey",
		width: 300,

	},
	btncomprar: {



		color: "#fff",
		alignSelf: 'center',
	},
	ajustar: {

		backgroundColor: '#987845',
		borderRadius: 5,
		width: 70,
		padding: 3,
		marginTop: 15,


	},
	separar: {
		marginTop: -12,

	},
	titulo: {
		textAlign: 'center',
		padding: 20,
		fontWeight: "bold"
	}
});
