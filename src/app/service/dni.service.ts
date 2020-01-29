import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_ENDPOINT } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DniService {

  private SERVER = API_ENDPOINT;
  
  public apiUrl =`${this.SERVER}mama/mamas-preinscritas?numdoc=`;

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
