export const generateProductsErrorInfo = (productExist) => {
    return "product not found in BD, please check the code";
  };
  
  export const generateCartErrorInfo = (cartExist) => {
    return "cart not found in BD, please check the code";
  };
  
  export const generateUserErrorInfo = (UserEmail) => {
    return `Email de usuario: ${UserEmail} no encontrado en la BD, porfavor chequeé el dato ingresado`;
  };
  
  export const generateTicketErrorInfo = () => {
    return "Not products in the cart";
  };

  export const loginPasswordErrorInfo = (userEmail) =>{
    return userEmail+" Password incorrect"
  }
  