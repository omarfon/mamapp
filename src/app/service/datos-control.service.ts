import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

/* import 'rxjs/add/operator/catch'; */
import { environment, API_ENDPOINT } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosControlService {

  private SERVER = API_ENDPOINT;
  apiUrl = `${this.SERVER}ebooking/getDiagnosticoEmbarazoEnCurso`;
  apiUrlStart = `${this.SERVER}ebooking/getSoloDiagnosticoEmbarazoEnCurso`;

  constructor(public http:HttpClient) { }

  getStartPregnacy(){
 
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({ "Authorization": authorization.authorization });
  
    return this.http.get(this.apiUrlStart , {headers}).pipe(
                map(data =>{
                  return data
                })/* .catch( e =>{
                  return Observable.of(e) 
                }) */
    )
                    
  }
  
  getParams( fromDate , toDate){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({ "Authorization": authorization.authorization });
    console.log(headers);
    console.log('las fechas:', fromDate, toDate);
    return this.http.get(this.apiUrl + `?fechaIni=${fromDate}&fechaFin=${toDate}` , {headers}).pipe(  
            map(data =>{
              return data
            })/* .catch( e =>{
              return Observable.of(e) 
              }); */
            )
  }
}
