import React, { useEffect } from 'react';
/*
Se importan todas la librerias necesarias para hacer la conexion a la base de datos
*/
import firebase from 'firebase/app'; require('firebase/auth')
//Se importan la libreria para crear los estilos
import { StyleSheet } from 'react-native';
//Se importan las libreris para los dos tipos de navegaciones a utilizar y el icono
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Icon } from "react-native-elements";

//Se crean las navegaciones correspondientes
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//Se importan las pantallas a utilizar
import login from './app/screens/Account/Login';
import Logged from "./app/screens/Account/Logged";
import Registro from "./app/screens/Account/Registrar";
import RutasProductos from './app/navigations/RutasProductos';
import Carrito from "./app/screens/Carrito";
import Busquedas from "./app/screens/Busquedas";


export default function App() {
  //Se hace la autenticación del usuario
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
    })
  }, []);

/* 
Se pone en una función todas las pantallas necesarias, en un tabnavigator,
para posteriormente utilizarlas de manera correcta, con el stack navigator,
ya que no se permite tener dos contenedores de navegacion al mismo tiempo
*/
  const tabs = () => (
//Se inicia el tab en la pantalla de cuenta
    <Tab.Navigator
      initialRouteName="cuenta"
      tabBarOptions={
        {
          activeTintColor: "#fff",
          activeBackgroundColor: "#987845",
          inactiveTintColor: "#fff",
          inactiveBackgroundColor: "#987845"
        }
      }
      
      //Se establecen los iconos para cada pantalla en la funcion de opciones
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => opciones(route, color),
        
      })}

    
    >

      {/*Se crea cada tab para cada pantalla*/}
      <Tab.Screen
        name="Inicio"
        component={RutasProductos}
        options={{ headerShown: false }} />
      <Tab.Screen
        name="Carrito de compras"
        component={Carrito}
        options={{ headerShown: false }} />
      <Tab.Screen
        name="Buscar"
        component={Busquedas}
        options={{  headerShown: false }} />
        <Tab.Screen
        name="cuenta"
        component={Logged}
        options={{ headerShown: false }} />
    
    </Tab.Navigator>




  )

  {/*Se crea la funcion "app", que posteriormente se va a importar para la correcta utilizacion de la navegación */}
  const app = () => (
    
    <NavigationContainer>
{/* Contenedor principal de los dos tipos de navegación a utilizar y pantallas del stack navigator*/}

      <Stack.Navigator>


        <Stack.Screen
          name="login"
          component={login}
          options={{headerShown: false }}
        />
        <Stack.Screen
          name="Registrar"
          component={Registro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Carrito de compras"
        component={Carrito}
        options={{ headerShown: false }} />
        {/* En este apartado se importa el menu de tabnavigator, para que se puedan utilizar de manera correcta,
        de acuerdo con los requerimientos del proyecto, ya que dos tipos de navegación, no estan permitidos, en el
        mismo contendor*/}

        <Stack.Screen
          name="puente"
          component={tabs}
          options={{ headerShown: false }}
        />


      </Stack.Navigator>

    </NavigationContainer>
  );


  return app();

}





/*
Funcion opciones que contiene y asigna todos los iconos de cada una de las tab principales de la aplicación de acuerdo
a su nombre.
*/
function opciones(ruta, color) {
  let iconName;

  switch (ruta.name) {
    case "Inicio":
      iconName = "home";
      break;
    case "Carrito de compras":
      iconName = "local-grocery-store";
      break;
    case "Buscar":
      iconName = "search";
      break;
    case "cuenta":
      iconName = "person";
      break;
    case "comentarios":
      iconName = "chat-bubble";
      break;
    default:
      break;
  }
  /*
  Se retorna el icono para cada una de las tab principales.
  */
  return (
    <Icon type="material-comunity" name={iconName} size={22} color={color} />
  )
}

/*
Estilos necesarios
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
