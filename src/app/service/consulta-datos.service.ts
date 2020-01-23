import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaDatosService {

  apiUrl = "http://localhost:3000";
 

  
  constructor(private http: HttpClient) { 

  }

  getDatos(dni){
    return this.http.get(this.apiUrl).pipe(
      map((resp:any)=>{
          return resp
      })
    );
    
  }
}
