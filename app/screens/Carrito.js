/*
Se importan las librerias necesarias para poder hacer la conexión a la base de datos y los componentes a utilizar. 
*/
import React, { useRef, useCallback,useState } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { Text, View } from 'react-native';
import Header from '../components/Headermain';
import { firebaseApp } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
/*
Se importa el la ventana de la lista de compras a mostrar
*/
import ListaCompras from '../components/Productos/ListaCompras';
import Toast from "react-native-easy-toast";
import { isUndefined } from "lodash";
/*
Se define una variable para poder atrapar el total de los productos que se encuentren en el carrito.
*/
var totalporfin = 0;

export default function Carrito(propiedades) {
 const { route } = propiedades;
 const toastRef=useRef();
 //Estado para guardar cada compra al carrito y mostrarlo despues en una lista
const [listcompras, setListcompras] = useState([])

/*
Estados necesarios para poder listar los productos agregados al carrito
*/  
 const [usuario,setUsuario]=useState(null);

 const [productos,setProductos]=useState([]);
 
 const [totalPro,setTotalPro]=useState(0); 
 
 const [puntero,setPuntero]=useState(null);



/*
Se hace la validación, para que al iniciar la aplicación no marque error, por el objeto indefinido.
*/
 if(isUndefined(route)){

setListcompras("Nada en parametetros")
 }else{

  /*
  Se hace la consulta de la coleción Recibo, de la base de datos, que son los productos agregados al carrito y 
  se pone en un useFocusEffect y useCallback para que cada que se agregue un producto, se recargue y se muestre
  automaticamente.
  */

useFocusEffect(
  useCallback(()=>{
    db.collection("Recibo")
    .get()
    .then((res)=>{
      setTotalPro(res.size);

    });
    const arrProductos=[];
    db.collection("Recibo").orderBy("creado","asc").limit(10).get()
    .then((res)=>{
      setPuntero(res.docs[res.docs.length -1]);
      res.forEach((doc)=>{
        const receipt = doc.data();
        receipt.id = doc.id;
        /*
        Se atrapa el total aguardado en la base de datos.
        */
        totalporfin = parseInt(receipt.totaltodo);
        arrProductos.push(receipt);
      });
      setProductos(arrProductos);
 
    });


  },[])

  
);

 }

 /*
 Se retorna la lista, de los productos agregados al carrito.
 */
  return (
    <View>
      <Header/>

      <ListaCompras 
        
      
        list={productos}
        totalporfin ={totalporfin}
        
      />
      {/*
        Se posiciona el toast en la posición correcta.
      */}
      <Toast ref={toastRef} position="center" opacity={0,9}/>
    </View>
  );
}

