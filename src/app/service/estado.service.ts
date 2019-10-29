import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private apiUrl = "https://dappapache02.eastus.cloudapp.azure.com/middleware2-copy/api/v2/status";

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
