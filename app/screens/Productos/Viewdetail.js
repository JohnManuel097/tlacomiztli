/*
Librerias necesarias y componentes a utilizar.
*/
import React,{useRef, useEffect, useState, useCallback } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import Toast from "react-native-easy-toast";
/*
Librerias se firebase para poder hacer consultas a la base de datos.
*/
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
/*
Libreria para poder utilizar iconos e input y para hacer validaciones.
*/
import {isEmpty} from "lodash";
import { Icon,Input } from "react-native-elements";

const screenWidth = Dimensions.get("window").width;
/*
Se crea el componente de la navegación
*/
import { useNavigation } from "@react-navigation/native";
/*
Variables necesarias para poder hacer la suma del total de los productos del carrito.
*/
var totaltodo = 0;
var iterador =0;
export default function Product(propiedades) {
	/*
	Se declaran los estados necesarios, y las variables necesarias para poder atrapar la cantidad y la cantidad elegida por el usaurio.
	*/
	const navegacion = useNavigation();
    var total = 0;
    var tiendastock = 0;
    var elegido = 0;
	const { navigation, route } = propiedades;
    const toastRef=useRef();
	const [producto, setProducto] = useState(null);
    const [datos, setDatos]=useState(valoresDefault);
	/*
	Se atrapan los componentes necesarios.
	*/
	const { id, nombre, categoria, precio, image, cantidad } = route.params;
	

	/*
	Función que permite volver a la pantalla anterior.
	*/
	const volverAtras = () => {
		navegacion.goBack();
	};


    const onSubmit = () => {
		/*
		Validación para no dejar el campo vacio.
		 */
       
       if(isEmpty(datos.number)){
     
        toastRef.current.show("No puedes dejar el campo de cantidad vacio");
       }else{
        /*
		Se atraoa el precio del producto
		*/
       var sub = parseInt(precio);
	   /*
		Se hace la consulta a la base de datos por id del producto para saber cual producto se eligio y atrapar los datos correspondientes.
	   */
            db.collection("Productos")
                .doc(id)
                .get()
                .then((resp) => {
                  console.log(datos.number)
                    const data = resp.data();
                    data.id = resp.id;
					//Se recupera la cantidad de productos que hay en la tienda.
                    tiendastock = parseInt(data.cantidad)
                    console.log("Stock :"+tiendastock)
					//Se recupera la cantidad de productos elegidos.
                    elegido = parseInt(datos.number);
					/*
					Se hace la validación, para que el usuario pueda elegir una cantidad de productos disponibles en la tienda y se le envia un mensa
					por pantalla.
					*/
                    if(tiendastock === 0){
                        toastRef.current.show("Lo sentimos, en este momento el producto no se encuentra disponible");
                    }else if(tiendastock<elegido){
                    toastRef.current.show("La cantidad disponible en la tienda del producto es: "+data.cantidad +"  "+data.nombre);

                }else if(elegido < 0 ){

                    toastRef.current.show("La cantidad a elegir no puede ser menor a cero");



                }else if(elegido === 0){
                    toastRef.current.show("La cantidad a elegir no puede ser igual a cero");


                }else{
                    //Datos a mandar el subTotal, cantidad elegida, id
                    setProducto(data);
                    //Se calcula el subtotal del producto
                    total = sub*elegido;
                   
					/*
					Se utiliza el iterador y se hace la validación, para que cada que se pase por esta pantalla, el total del carrito no sea aumentado y 
					no se aumente considerablemente ya que si no se hace este control, el total del carrito no se controla de manera correcta y esto se hace
					con el iterador y dejando de manera global la variable totaltodo.
					*/
                    if(iterador ===0){
                        totaltodo = parseInt(totaltodo) +parseInt(total)
                        iterador =iterador+1;
                        console.log("Total: "+totaltodo)
                    }else if(iterador===1){
                        totaltodo = parseInt(totaltodo) +parseInt(total)

                        iterador =iterador+1;
                        console.log("Total: "+totaltodo)

                    }else if(iterador === 2){
                        totaltodo = parseInt(totaltodo) +parseInt(total)

                        iterador =iterador+1;
                        console.log("Total: "+totaltodo)
                    }
                    else if(iterador === 3){
                        totaltodo = parseInt(totaltodo) +parseInt(total)

                        iterador =iterador+1;
                        console.log("Total: "+totaltodo)
                    }
                    else if(iterador === 4){
                        totaltodo = parseInt(totaltodo) +parseInt(total)

                        iterador =iterador+1;
                        console.log("Total: "+totaltodo)
                    }
                    else if(iterador === 5){
                        totaltodo = parseInt(totaltodo) +parseInt(total)

                        iterador =iterador+1;
                        console.log("Total: "+totaltodo)
                    }else if(iterador === 6){
                        totaltodo = parseInt(totaltodo) +parseInt(total)

                        iterador =iterador+1;
                        console.log("Total: "+totaltodo)
                    }
                    else if(iterador === 7){
                        totaltodo = parseInt(totaltodo) +parseInt(total)

                        iterador =iterador+1;
                        console.log("Total: "+totaltodo)
                    }
                    else if(iterador === 8){
                        totaltodo = parseInt(totaltodo) +parseInt(total)

                        iterador =iterador+1;
                        console.log("Total: "+totaltodo)
                    }
                    else if(iterador === 9){
                        totaltodo = parseInt(totaltodo) +parseInt(total)

                        iterador =iterador+1;
                        console.log("Total: "+totaltodo)
                    }else if(iterador === 10){
                        totaltodo = parseInt(totaltodo) +parseInt(total)

                        iterador =iterador+1;
                        console.log("Total: "+totaltodo)
                    }
                       
                        /*
						
						Se crea el recibo en la base de datos para poder recuperarlos y listarlos en el carrito, con todos los datos necesarios.
						*/
                    db.collection("Recibo")
                        .add({
                            id:id,
                            elegido:elegido,
                            cantidadoriginal:parseInt(cantidad),
                            total:total,
                            precio:parseInt(precio),
                            imagenes:image,
                            totaltodo:totaltodo,
                            creado:new Date(),
                            creadoPor: firebase.auth().currentUser.uid,
                        })
                        .then(()=>{
							/*
							Se hace el descuento de la cantidad elegida en la colección productos, del producto seleccionado.
							*/
                            db.collection("Productos").doc(id).update({
                                cantidad: parseInt(cantidad) - parseInt(elegido)
                              })
							  /*
							 Se redirecciona al carrito y se envian los datos necesarios. 
							  */
                            navegacion.navigate("Carrito de compras",{id,total,elegido,cantidad,totaltodo})
                            
                        }).catch(()=>{
							/*
							Si ocurre algun error se imprime un mensaje por pantalla.
							*/
                            toastRef.current.show("No es posible agregar el producto al carrito");
                        })
                }
                });
       }
    };
	/*
	Metodo para poder escribir e identificar el input
	*/
	const onChange = (e, type) => {
		setDatos({ ...datos, [type]: e.nativeEvent.text });
	};
	return (
		<View>
			<View style={styles.container}>
				{/*
				Aqui es importante destacar que al querer agregar el componente del encabezado, marcaba error, por lo que se importo la logica del 
				encabezado, para poder mostrar el encabezado correctamente.
				*/}
				<TouchableOpacity onPress={volverAtras} style={styles.main}>
					<Icon
						type="material-community"
						name="chevron-left"
						style={styles.icono}
						color="#fff"
					/>
				</TouchableOpacity>
				<Image
					style={styles.logo}
					source={require("../../../assets/img/icono.png")}
				/>
			</View>


			{/*
			Se hace la validación para saber si nos llegan datos y poder mostrar la estructura del producto, con un boton para poder agregar 
			el producto al carrito y en caso de que no haya datos se muestra un ActivityIndicator y un mensaje que dice cargando produco.
			*/}
			{nombre ? (
				<ScrollView style={styles.fondo}>
					<Image style={styles.logodos} source={{ uri: image }} />
					<View style={styles.containersecond}>
						<Text style={styles.name}>Nombre: {nombre}</Text>
						<Text style={styles.category}>Categoria: {categoria}</Text>
						<Text style={styles.price}>Precio: {precio}</Text>
					</View>
					<Input
						placeholder="Digite la cantidad que desea"
						containerStyle={styles.inputForm}
						onChange={(e) => onChange(e, "number")}
                        keyboardType='numeric'
						
					/>
					<TouchableOpacity  onPress={onSubmit}>
						<View style={styles.btn}>
							<Text style={styles.btncomprar}>Agregar al carrito</Text>
						</View>
					</TouchableOpacity>
                    <Toast ref={toastRef} position="center" opacity={0,9}/>
				</ScrollView>
			) : (
				<View style={styles.sucursales}>
					<ActivityIndicator size="large" color="#0000ff" />
					<Text>Cargando Producto</Text>
				</View>
			)}
		</View>
	);
}


/*
Función con el valor por default del input.
*/
function valoresDefault(){
    return{
        number:"",

    };
}


/*

Estilos necesarios para poder mostrar la estrura del producto correctamente así como el botón.
*/
const styles = StyleSheet.create({
	sucursales: {
		marginTop: 10,
		marginBottom: 10,
		alignItems: "center",
	},
	body: {
		flex: 1,
		backgroundColor: "white",
	},
	viewSucursal: {
		padding: 15,
	},
	nombre: {
		fontSize: 20,
		fontWeight: "bold",
	},
	descripcion: {
		marginTop: 5,
		color: "grey",
	},
	direccion: {
		marginTop: 5,
		color: "grey",
	},
	direccionTitulo: {
		fontWeight: "bold",
		marginTop: 5,
		color: "grey",
	},
	rating: {
		position: "absolute",
		right: 0,
	},
	listaInfo: {
		borderBottomColor: "#D8D8D8",
		borderBottomWidth: 1,
	},
	fondo: {},
	container: {
		height: 72,
		width: "100%",
		alignItems: "center",

		backgroundColor: "#987845",
		marginTop: 30,

		flexDirection: "row",
	},
	main: {
		height: 55,
	},
	logo: {
		width: 72,
		height: 72,
		justifyContent: "center",
		alignSelf: "center",
		alignItems: "center",
		marginLeft: 105,
	},
	logodos: {
		width: 200,
		height: 200,
		justifyContent: "center",
		alignSelf: "center",
		alignItems: "center",
		position: "relative",
		marginTop: 30,
	},
	icono: {
		color: "#fff",
		tintColor: "#fff",
		marginLeft: 15,
		marginTop: 15,
	},
    iconosub: {
		color: "#000",
		tintColor: "#000",
		marginTop:20,
	},
	name: {
		fontWeight: "bold",
		marginTop: -75,
		textAlign: "justify",
		width: 150,
		marginLeft: 30,
	},
	category: {
		paddingTop: 2,
		color: "grey",
		marginBottom: 20,
		marginLeft: 45,
	},
	price: {
		paddingTop: 2,
		color: "grey",
		width: 300,
		marginLeft: 70,
		marginTop: -14,
	},
	containersecond: {
		position: "relative",
		marginLeft: 80,
		marginTop: 95,
	},
	btncomprar: {
		color: "#fff",
		alignSelf: "center",
		marginTop: 14,
	},
	btn: {
		backgroundColor: "#987845",
		color: "#fff",
		borderRadius: 15,
		textAlign: "center",
		width: 200,
		height: 50,
		marginLeft: 85,
		marginTop: 15,
	},
    inputForm:{
        width:"70%",
        marginTop:20,
        marginLeft:60,
    },
});
