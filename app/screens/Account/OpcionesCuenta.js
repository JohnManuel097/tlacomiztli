/*
Se importan las librerias y componentes necesarios.
*/
import React, { useState } from 'react';
import { View, StyleSheet,Text} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { map } from "lodash";
/*
Se importa el Modal y las pantallas para poder cambiar la información del usuario.
*/
import  Modal  from '../../components/Modal';
import CambiarEmail from "./CambiarEmail";
import CambiarPassword from "./CambiarPassword";
import CambiarNombre from "./CambiarNombre";


export default function OpcionesCuenta({userInfo, toastRef, setRealoadUserInfo}) {
 
    /*
    Estados para poder mostra la pequeña ventana que nos permitira cambiar la información del usuario.
    */
    const [showModal, setShowModal] = useState(false);
   
    const [renderComponent, setRenderComponent] = useState(null);
   


    /*
    Función que contiene los el titulo de la opción correspondiente a elegir, asi como el icono, de cada una de las opciones
    y en caso que se le de clic, se guarda el nombre de la opcion en el estado.
    */
    const generateOptions = () => {


        return[
        {
            title:"Cambiar Nombre",
            iconType:"material-community",
            iconNameLeft:"account-circle",
            iconColorLeft:"#ccc",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress: () => selectedComponent("displayName"),
        
        
        },
        {
            title:"Cambiar correo electronico",
            iconType:"material-community",
            iconNameLeft:"at",
            iconColorLeft:"#ccc",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress: () => selectedComponent("email"),
        
        
        },
        {
            title:"Cambiar contraseña",
            iconType:"material-community",
            iconNameLeft:"lock-reset",
            iconColorLeft:"#ccc",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress: () => selectedComponent("password"),
        
        
        },
        
        ];
        
        
        }



    const selectedComponent = (key) => {
      
        /*
        Swich que nos permitira, cambiar la información del usuario, de acuerdo con la opción elegida, y se guarda en el 
        estado de rendercomponent
        */
        switch (key) {
           
            case "displayName":
            
               
                setRenderComponent(
                    <CambiarNombre
                    displayName={userInfo.displayName}
                    setShowModal={setShowModal}
                    toastRef={toastRef}
                    setRealoadUserInfo={setRealoadUserInfo}
                />
                );
                    
          
                break;

            case "email":
                setRenderComponent(
                    <CambiarEmail
                        email={userInfo.email}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setRealoadUserInfo={setRealoadUserInfo}
                    />
                );
               
                break;

            case "password":
                setRenderComponent(
                    <CambiarPassword

                        setShowModal={setShowModal}
                        toastRef={toastRef} />
                );
              
                break;

            default:
                setRenderComponent(null);
                setShowModal(false);
                break;
        }
        setShowModal(true);
    };

    /*
    Se guardar los datos de la función para poder mostrar las opciones, para cambiar la informacón del usuario.
    */
    const menuOptions = generateOptions();


    return (
        <View>
            {/*
            Se carga el menu con las opciones, para poder cambiar la información del usuario.
            */}
            {map(menuOptions,(menu, index) => (
                <ListItem key={index} style={styles.menuItem} onPress={menu.onPress}>
                    <Icon 
                    name={menu.iconNameLeft} 
                    type="material-community"
                     color={menu.iconColorLeft} 
                     />
                    <ListItem.Content>
                        <ListItem.Title>{menu.title}</ListItem.Title>
                    </ListItem.Content>
                    <Icon
                     name={menu.iconNameRight}
                     type="material-community"
                      color={menu.iconColorRight} 
                      />
                </ListItem>
            ))
            
            }
    
                 {/*
                 Modal, en el cual se mostraran los campos, para poder cambiar la información.
                 */}
                <Modal isVisible={showModal} setVisible={setShowModal}>
                 {renderComponent}
                </Modal>
        
        </View>
    );
}



/*
Estilos necesarios, para poder mostrar el menu de una manera correcta.
*/
const styles = StyleSheet.create({
menuItem:{
    borderBottomColor:"#e3e3e3",
    borderBottomWidth:1,
},

})