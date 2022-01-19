import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { API_ENDPOINT } from '../../environments/environment';
import { REGISTERMICRO } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private SERVER = API_ENDPOINT;
  private apiValidate = `${this.SERVER}users/validateemail/register`;
  private apiCreate = `${this.SERVER}users/register/`;
  public urlRegisterMicro = REGISTERMICRO;

  public data: any;
  constructor(public http: HttpClient) { }


  createNewUser(datos){
    // console.log('los datos de register:', datos)
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    let params = datos;
    // console.log('los datos de register:', datos)
    // params.provisions = [{"tipoPrestacion":"CONSULTA", "instructions":"", "name":"CONSULTA AMBULATORIA POR MEDICO ESPECIALISTA", "default":false, "id":44}]
    return this.http.post(this.apiCreate , params , {headers}).pipe(  
              map((resp:any)=>{
                return resp;
              })
    )
  }

  registerNewUser(codeValida: any) {
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    console.log(this.data, codeValida)
    
    return this.http
      .post(this.urlRegisterMicro + 'users/newRegister', {
        "email": codeValida.email,
        "password": codeValida.password,
        "name": codeValida.name,
        "surname1": codeValida.surname1,
        "surname2": codeValida.surname2,
        "birthdate": codeValida.birthdate,
        "gender": {
          "id": codeValida.gender.id,
          "name": codeValida.gender.name,
        },
        "documentType": {
          "id": codeValida.documentType.id,
          "name": codeValida.documentType.name
        },
        "documentNumber": codeValida.documentNumber,
        "phone": codeValida.phone,
        "code": 1234,
        "id": codeValida.id
      }, {headers});
  }


  validateEmail(email, documentNumber, documentId, document){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    let params = {email, documentNumber, documentId, document};

    return this.http.post(this.apiValidate , {"email": email, 
                                              "documentType":{
                                                "id":documentId,
                                              "name":document},
                                              "documentNumber":documentNumber.toString()}, 
                                              {headers}).pipe(
                      map((resp:any)=>{
                        return resp;
                      })
    )
  }

  recovery(email){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    let params = email;

    return this.http.post(this.SERVER + 'validate-email/recovery' , params, {headers}).pipe(
                      map((resp:any)=>{
                        return resp;
                      })
    )
  }
  
}
