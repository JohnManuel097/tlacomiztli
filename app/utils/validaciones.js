/*
Función que nos v a a permitir hacer la validación del correo electronico, del usuario que se quiera registrar o
en su caso iniciar sesión.
*/
export function validarEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /*Nos retorna true si el correo tiene todas las expresiones
    correctas y false si no es correcto el correo electronico
    */
    return re.test(email);
  }
