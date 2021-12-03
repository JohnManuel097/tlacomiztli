import React from "react";
/*
Se crea la navegación.
*/
import { createNativeStackNavigator } from "@react-navigation/native-stack";
/*
Se crea el objeto de la navegación stack
*/
const Stack = createNativeStackNavigator();

/*
Se importan las pantallas, que van a estar en la navegación stack.
*/
import Productos from "../screens/Productos/Productos";
import Categoria from "../screens/Productos/Categoria";
import Viewdetail from "../screens/Productos/Viewdetail";

/*
Función que nos va a permitir navegar entre cada una de las pantallas importadas. 
*/
export default function RutasProductos() {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name="producto"
            component={Productos}
            options={{title:"Inicio"},{ headerShown:false}}
            />
           
             <Stack.Screen
            name="categorias"
            component={Categoria}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="viewdetail"
            component={Viewdetail}
            options={{headerShown:false}}
            />
          
        </Stack.Navigator>
    );
}