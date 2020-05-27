// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyBMopx6KZ79wFANi2Yb6ysxvAIdRso96VY",
    authDomain: "aviva-mamapp-dev.firebaseapp.com",
    databaseURL: "https://aviva-mamapp-dev.firebaseio.com",
    projectId: "aviva-mamapp-dev",
    storageBucket: "aviva-mamapp-dev.appspot.com",
    messagingSenderId: "519988913097",
    appId: "1:519988913097:web:dca29f129d59cc0b",
    vapidKey: "BBwWAlKhU8eHfS-ntn7Mc4XD0HEMmQv8wmA-niDLj4eP28bi4CFjmp-gGwH3bQXAqi4OFU3lg95czzAx_akXDyo",
  }
/*    ,
  agora:{
    appId: "b75a830a11a84a0bbb812fc81aa60860"
  } */
/*    firebase : {
    apiKey: "AIzaSyC79bO4W3NAW6tjRGe8Y-cx9bK2Nb5t760",
    authDomain: "aviva-mamapp-prod.firebaseapp.com",
    databaseURL: "https://aviva-mamapp-prod.firebaseio.com",
    projectId: "aviva-mamapp-prod",
    storageBucket: "aviva-mamapp-prod.appspot.com",
    messagingSenderId: "123950719277",
    appId: "1:123950719277:web:331d4e07590df134be73a4",
    vapidKey: "BBwWAlKhU8eHfS-ntn7Mc4XD0HEMmQv8wmA-niDLj4eP28bi4CFjmp-gGwH3bQXAqi4OFU3lg95czzAx_akXDyo", 
  }   */
};

/* ENDPOINTS DESARROLLO */
/* export const API_ENDPOINT = "https://dappapache02.eastus.cloudapp.azure.com/middleware2/api/v2/"; 
export const API_NOTAS = "https://dappapache02.eastus.cloudapp.azure.com/middleware2/api/v2/mama/"; 
export const API_IMAGES = "https://dappapache02.eastus.cloudapp.azure.com/middleware2/img/professionals/"   */  

/* ENDPOINTS PRODUCCION */

 export const API_IMAGES = "https://api.aviva.pe/middleware2/img/professionals/";
export const API_ENDPOINT = "https://api.aviva.pe/middleware2/api/v2/";
export const API_NOTAS = "https://api.aviva.pe/middleware2/api/v2/mama";   

/* export const firebaseConfig ={
  apiKey: "AIzaSyC79bO4W3NAW6tjRGe8Y-cx9bK2Nb5t760",
  authDomain: "aviva-mamapp-prod.firebaseapp.com",
  databaseURL: "https://aviva-mamapp-prod.firebaseio.com",
  projectId: "aviva-mamapp-prod",
  storageBucket: "aviva-mamapp-prod.appspot.com",
  messagingSenderId: "123950719277",
  appId: "1:123950719277:web:331d4e07590df134be73a4"
}   */

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
