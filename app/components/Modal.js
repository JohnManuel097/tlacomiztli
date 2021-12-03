import React from "react";
/*
Se importan los componentes necesarios.
*/
import { StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

export default function Modal({isVisible, setVisible, children}) {

  /*
  Se pone el componente Overlay que nos permitara mostrar la información del usuario, y se le pasa si esta visible o no,
  como parametro.
  */
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,0.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
      onBackdropPress={()=> setVisible(false)}
    >
      {children}
    </Overlay>
  );
}

/*
Estilos necesarios para poder mostrar el Modal, de una manera correcta.
*/

const styles = StyleSheet.create({
  overlay: {
    height: "auto",
    width: "90%",
    backgroundColor: "#fff",
  },
});