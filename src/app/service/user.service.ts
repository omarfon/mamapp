import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { environment, API_ENDPOINT } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private SERVER = API_ENDPOINT;
  /* private SERVER2 = "https://dappapache02.eastus.cloudapp.azure.com/middleware2-copy/api/v2/auth/login-firebase" */
  private apiUrl = this.SERVER;
  private apiUrlDatos = `${this.SERVER}auth/login/ebooking/`;
  private newLogin = this.SERVER + 'users/newLogin';
  private reniec = 'https://apiperu.dev/api/dni/';
  public recoveryData;
  public dataSend;

  constructor( public http: HttpClient) { }

  doSignIn(email, password){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});

    let params = {email: email, password: password, app:"mama"}
      return this.http.post(`${this.SERVER}auth/login` , params, {headers}).pipe( 
              map(data =>{
              return data
        })
      )
  }

  newLoginWithDni(documentType:string, documentNumber: string, password: string){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    const app = "mama"
    let params = {documentType, documentNumber, password, app};
     return this.http.post(this.newLogin, params, {headers}).pipe(
       map(resp => {
         return resp
       }), err => {
        return err
    })
  }

  doSignInforNewRegister(email, password){
    let params = {email:email, password: password , captchaId: "4dbc9e7e-a921-4d1f-8e36-1021a670c47a"}
    // let params = {email:email, password: shajs('sha256').update(password).digest('hex') }
    return this.http.post(`${this.apiUrl}auth/login`, params).pipe(
                  map(data =>{
                    return data
                  })
    )
  }

  doSignUp(params){
    return this.http.post(`${this.apiUrl}users/register`, params).pipe(
                  map( data =>{
                    return data
                  })
    )
  }

  getPublicKey(dni:string){
    const auth_token = '30dcd655149906b1469ac3913125f30862b0ab1b4bc0425f8256166d98a82d02';
    const cabecera = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.get(this.reniec + dni, {headers: cabecera})
    }


/*   sendValidation(email){
    let params = {email: email};
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    console.log('params:', params);
    return this.http.post(this.SERVER + 'users/validate-email/recovery', params, {headers}).pipe(
                    map(data =>{
                      return data
                    })
    )
  } */

  sendValidation(email, documentNumber, documentId, selectDocument){
    /*     let params = {email: email, documentType:{id:documentId,name:selectDocument},documentNumber:documentNumber}; */
        const authorization = JSON.parse(localStorage.getItem('authorization'));
        let headers = new HttpHeaders({"Authorization": authorization.authorization});
    /*     console.log('params:', params); */
        return this.http.post(this.apiUrl + 'validateemail/register', 
                                            {"email": email, 
                                              "documentType":{"id":documentId.toString(),"name":selectDocument},"documentNumber":documentNumber.toString()}, 
                                              {headers}).pipe(
                        map(data =>{
                          return data
                        })
        )
      }

  recoveryLogin(datos){
    /* let params = {code: datos.code, email: datos.email, id: datos.id, password: datos.password, app: 'mama'}; */
    let params = datos;
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    return this.http.post(`${this.apiUrl}users/validate-email/recovery`, params, {headers}).pipe(
                    map(data => {
                      return data
                    })/* .catch(e =>{
                      return Observable.of(e)
                    }); */
    )
  }

  loginRecovery(datos){
    //CORREGIR LLAMADA DE RECUPERAción
  /*   let params = {code: datos.code, email: datos.email, id: datos.id, password: datos.password, app: 'ebooking'}; */
  let params = datos;  
  const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    return this.http.post(this.apiUrl + 'users/login-recovery', params, {headers}).pipe(
                    map(data => {
                      return data
                    })
    )
  }

  changePassword(password, passwordNew){
    let params = {password: password, passwordNew: passwordNew };
    // console.log('los paramasque cambian la contraseña:', params);
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    return this.http.put(`${this.apiUrl}users/update-password`, params, {headers}).pipe(
                    map(data => {
                      return data
                      
                    })/* .catch(e =>{
                      return Observable.of(e)
                    }); */

    )
  }

  getDatosPaciente(){
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});
    return this.http.get(this.apiUrlDatos + `datos-paciente`, {headers}).pipe(
                    map(data => {
                      return data
                    })/* .catch(e =>{
                      return Observable.of(e)
                    }); */

    )
  }

}
