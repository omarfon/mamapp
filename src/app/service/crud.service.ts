import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { API_ENDPOINT } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private SERVER = API_ENDPOINT;
  private apiValidate = `${this.SERVER}users/validate-email/register`;
  private apiCreate = `${this.SERVER}users/register/`;

  constructor(public http: HttpClient) { }


  createNewUser(datos){
    // console.log('los datos de register:', datos)
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});
    let params = datos;
    // console.log('los datos de register:', datos)
    // params.provisions = [{"tipoPrestacion":"CONSULTA", "instructions":"", "name":"CONSULTA AMBULATORIA POR MEDICO ESPECIALISTA", "default":false, "id":44}]
    return this.http.post(this.apiCreate , params , {headers}).pipe(  
              map((resp:any)=>{
                return resp;
              })
    )
  }


  validateEmail(email){
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});
    let params = {email};

    return this.http.post(this.apiValidate , params , {headers}).pipe(
                      map((resp:any)=>{
                        return resp;
                      })
    )
  }
  
}
