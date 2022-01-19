import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map } from 'rxjs/operators';
import { API_ENDPOINT } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private apiUrl = API_ENDPOINT+ '/status';

  constructor(public http:HttpClient) { }


  actualMomento(){
    return this.http.get(this.apiUrl).pipe(
      map(
        resp =>{
          return resp
        })
    )
      }

      
}
