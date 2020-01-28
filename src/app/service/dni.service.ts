import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DniService {
  
  public apiUrl ="https://dappapache02.eastus.cloudapp.azure.com/middleware2-copy/api/v2/mama/mamas-preinscritas?numdoc=";

  constructor(public http: HttpClient) { }


  getDataDni(dni){
    return this.http.get(`${this.apiUrl}${dni}`).pipe(
      map(
        resp =>{
          return resp
        })
    )
    
  }
}
