import React, { useState, useCallback } from "react";
/*
Se importan las librerias y componentes necesarios.
*/
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Image } from "react-native-elements";
import { isUndefined, size, length } from "lodash";
/*
Se importa el componente de la navegación y el useFocusEffect. 
*/
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
/*
Se importa el WebView para el pago.
*/
import { WebView } from "react-native-webview";
/*
Se importa las librerias de firebase para hacer consulta de los productos elegidos, para el carrito por el usuario.
*/
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
/*
Variable que va a contener la suma total del subtotal de todos los productos.
*/
var sumatotal = 0;


export default function ListaCompras(propiedades) {
	/*
	Se crea el objeto de la navegación, asi como el estado que nos permitira mostrar la ventana para hacer el pago de los
	productos y ver el estado del pago.
	*/
	const navegacion = useNavigation();
	const { list } = propiedades;
	const [state, setState] = useState({showModal: false,status:'Pendiente'})

	/*
	Función que nos cambia el estado del pago, en caso de que se haya realizado.
	*/
	const handleResponse = data => {
		if(data.title === 'success'){
			setState({showModal: false, status: 'Pagado'});
		}else if(data.title === 'cancel'){

			setState({showModal: false, status:'Pago cancelado'});

		}else{
			return;
		}

	}
	  
	  /*
	 validación, para que al momento de iniciar la aplicación, no marque ningún error, por no haber nada en el carrito. 
	  */
	if (isUndefined(list)) {
	} else {
	
	

		/*
		Se hace la consulta en la base de datos, para saber si el usuario ha elegido algunos productos y se ponen en un
		useFocusEffect y useCallback, para que cada que se agreguen productos, se muestren en el carrito automaticamente.
		*/
		useFocusEffect(
			useCallback(() => {
				db.collection("Recibo")
					.orderBy("creado", "asc")
					.limit(10)
					.get()
					.then((res) => {
						res.forEach((doc) => {
							const receipt = doc.data();
							receipt.id = doc.id;
							/*
							Se recupera el total de los productos, guardados en la base de datos.
							*/
							sumatotal = parseInt(receipt.totaltodo);
						});
						

					});
			})
		);

			/*
			Funcipon que nos permite mostrar la ventana de pago si, así se desea.
			*/
		const pago = () => {
			setState({showModal: true})
		};
		
		return (
			<ScrollView>
				{/*
				Se hace la validación para saber si se van agregar productos al carrito, caso contrario, con un 
				activityindicator, se muestra un texto que dice que no hay productos en el carrito.
				*/}
				{size(list) > 0 ? (
					<ScrollView>
						{/*
						Se muestra titlos y la lista de los producto del carrito.
						*/}
						<Text style={styles.titulorecibo}>Carrito</Text>
						<Text style={styles.subtitulo}>Descripción</Text>
						<FlatList
							data={list}
							renderItem={(list) => <Lista list={list} />}
							keyExtractor={(item, index) => index.toString()}
						/>

						 {/*
						 	Modal, que contiene el WebView, para poder realizar el pago.
						 */}
						<Modal
						visible={state.showModal}
						onRequestClose={()=> setState({showModal: false})}
						>

							{/*
							Web view que contiene la url conectada a la aplicación de expresss, para poder realizar el pago.
							*/}
							<WebView 
						
						source={{ uri: 'http://192.168.1.6:3000/' }}
						onNavigationStateChange={(data) => handleResponse(data)}
						injectedJavascript={` var d = document.getElementById('#f1');
							d.submit();`}
						onMessage={(e)=>{}}
						
						/> 


						</Modal>

								{/*
								Se muestra el total, así como el status del pago y el botón para poder realizar el pago.
								*/}
						<Text style={styles.totalporfin}>Total: {sumatotal}MXN</Text>
						<Text style={styles.status}>Status del pago: {state.status}</Text>
						<ScrollView horizontal style={styles.acomodo}>
							<TouchableOpacity style={styles.btnpagardos} onPress={pago}>
								<Text style={styles.btntextodos}>Pagar</Text>
							</TouchableOpacity>
						</ScrollView>
					</ScrollView>
				) : (
					
					<View style={styles.productos}>
						{/*
							Mensaje que se mostrara en caso de que no haya productos en el carrito.
						*/}
						<ActivityIndicator size="large" color="#0000ff" />
						<Text>No hay ningún producto en el carrito</Text>
					</View>
				)}
			</ScrollView>
		);

		

	}	

}

function Lista(propiedades) {
	/*
	Se atrapan los componentes necesarios.
	*/
	const { list } = propiedades;
	const { cantidadoriginal, elegido, id, total, imagenes, precio } = list.item;
	/*
	Se crea el objeto de navegación, así como el estado para saber si el producto se elimino.
	*/
	const navegacion = useNavigation();
	const [eliminated, setEliminated] = useState(false)

	const eliminar = () =>{
		/*
		Se elimina el producto de la base de datos.
		*/
	db.collection("Recibo").doc(id).delete().then(()=>{
		
		console.log("Producto eliminado con exito");

	}).catch((error)=>{	
		/*
		Si hay algún error al intentar eliminar un producto de la base de datos, se muestra el mensaje por consola.
		*/
		console.log("Error al intentar eliminar el producto del carrito")
	});
	setEliminated(true);
}


	return (
		<ScrollView>
			<TouchableOpacity onPress={eliminar}>
				<View style={styles.lista}>
					{/*
					Imagen del producto que se encuentra en el carrito, cada producto cuenta con un onPress, que nos permitira,
					eliminar el producto, si se le dio clic.
					*/}
					<Image
						resizeMode="cover"
						PlaceholderContent={<ActivityIndicator color="#0000ff" />}
						source={
							imagenes[0]
								? { uri: imagenes }
								: require("../../../assets/img/no-encontrado.png")
						}
						style={styles.imagen}
					/>
					<View style={styles.viewImagen}>
						{/*
						Se muestran los datos del producto en el carrito.
						*/}
						<Text style={styles.nombre}>Cantidad: {elegido}</Text>

						<Text style={styles.nombre}>Precio: {precio}</Text>
						<Text style={styles.nombre}>SubTotal: {total}</Text>
					</View>
				</View>
			</TouchableOpacity>
		</ScrollView>
	);
}


/*
Estilos necesarios, para poder mostrar la lista de los productos que el usuario ha elegido poner en el carrito, asi como 
el status del pago, el total y el boton de pagar.
*/
const styles = StyleSheet.create({
	productos: {
		marginTop: 10,
		marginBottom: 10,
		alignItems: "center",
	},
	nombre: {
		fontWeight: "bold",

		textAlign: "justify",
		width: 90,
		marginLeft: 10,
		marginRight: 35,
		color: "grey",
	},
	nombredos: {
		fontWeight: "bold",

		textAlign: "justify",
		width: 90,
		marginLeft: 270,
		marginRight: 35,
		color: "grey",
	},
	direccion: {
		color: "grey",
		marginLeft: 70,
		marginRight: 10,
	},
	categoria: {
		paddingTop: 2,
		color: "grey",
		marginBottom: 20,
	},
	lista: {
		flexDirection: "row",
		marginLeft: 15,
	},

	imagen: {
		width: 100,
		height: 100,
		marginTop: 30,
	},
	viewImagen: {
		flexDirection: "column",
		marginTop: 50,
	},
	descripcion: {
		paddingTop: 2,
		color: "grey",
		width: 300,
	},
	btncomprar: {
		color: "#fff",
		alignSelf: "center",
	},
	ajustar: {
		backgroundColor: "#987845",
		borderRadius: 5,
		width: 70,
		padding: 3,
		marginTop: 15,
	},

	titulo: {
		textAlign: "center",
		padding: 20,
		fontWeight: "bold",
	},
	subtitulo: {
		marginLeft: 15,
		fontWeight: "bold",
	},
	containerecibo: {
		flexDirection: "row",
	},
	titulorecibo: {
		fontWeight: "bold",
		alignSelf: "center",
		marginBottom: 20,
		marginTop: 5,
	},
	btnpagar: {
		backgroundColor: "#987845",
		borderRadius: 15,
		width: 120,
		height: 50,
		marginTop: 14,
		marginLeft: 78,
		position: "relative",
	},
	btntexto: {
		color: "#fff",
		textAlign: "center",
		marginTop: 14,
	},
	btnpagardos: {
		backgroundColor: "#987845",
		borderRadius: 15,
		width: 120,
		height: 50,
		marginTop: 14,
		marginLeft: 220,
		position: "relative",
	},
	btntextodos: {
		color: "#fff",
		textAlign: "center",
		marginTop: 14,
	},
	acomodo: {
		flexDirection: "row",
	},
	totalporfin: {
		marginLeft: 250,
		
		
	},
	status: {
		marginLeft: 180,
		width:250,
		
	},
});
