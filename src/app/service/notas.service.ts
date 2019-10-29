import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment, API_NOTAS } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private SERVER = API_NOTAS;
  private apiUrl = `${this.SERVER}`;
  private apiUrlFilter = `${this.SERVER}`;
  private apiUrlSemana = `${this.SERVER}notas-por-semana?semana=`;



  /* private apinota */



  constructor(public http: HttpClient) { }

  getNotes(){
    return this.http.get(this.apiUrl ).pipe(
      map((resp:any)=>{
        return resp
      })
    )
  }
  
  getNotesFilter(elfiltro){
    console.log('el filtro en home:', elfiltro);
    return this.http.get(this.apiUrlFilter + `${elfiltro}?_sort=semana:desc`).pipe(
                  map((resp:any) =>{
                      return resp
                  })
      
                )
          }

  getNota(semana){
    return this.http.get(this.apiUrlSemana + `${semana}`).pipe(
                     map((resp:any) => {
                        return resp;
                      })
                      )
                    }
}
