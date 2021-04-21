import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { API_ENDPOINT, API_NOTAS } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private SERVER = API_NOTAS;
  private apiUrl = `${this.SERVER}/xnotas`;
  private apiUrlFilter = `${this.SERVER}`;
  private apiUrlSemana = `${this.SERVER}/notas-por-semana?semana=`;
  private apiUrlContentAviva = `${this.SERVER}/xtrans`;
  private newUrl = "https://api.aviva.pe/middleware2/api/v2/mama/data";
  categoriasSincronas: any;
  categoriasAtemp: any;
  categoriasTotales: Observable<any>;


  constructor(public http: HttpClient) { }

  getNotes(){
    let params = {
      "baseUrl": "https://docs.google.com/spreadsheets/d/1phyPDjBmOh5T8PxUUrgNp3T-ilZP6cpUrDQVNZeWy3g",
      "sheets": [
          {
              "gid": "0",
              "name": "pastilla"
          },
          {
              "gid": "2055824055",
              "name": "comparativa"
          },
          {
              "gid": "902371996",
              "name": "cambios"
          },
          {
              "gid": "1838191654",
              "name": "evobebe"
          },
          {
              "gid": "81075087",
              "name": "nutricion"
          }
      ]
  }

    return this.http.post(this.apiUrl , params).pipe(
      map((resp:any)=>{
        return resp
        /* this.categoriasSincronas = resp; */
      })
    )
  }

  getNotesTrans(){
    let params = {
      "baseUrl": "https://docs.google.com/spreadsheets/d/1phyPDjBmOh5T8PxUUrgNp3T-ilZP6cpUrDQVNZeWy3g",
      "sheets": [
          {
              "gid": "623058844",
              "name": "consejos"
          },
          {
              "gid": "1918276289",
              "name": "aviva"
          }
      ]
  }

    return this.http.post(this.apiUrlContentAviva , params).pipe(
      map((resp:any)=>{
        return resp
       /* this.categoriasAtemp = resp;  */
      })
    )
  }

 /*  getNotasTotales(){
    return this.categoriasTotales = combineLatest(
      (this.categoriasSincronas, this.categoriasAtemp)
      );
     
  } */
  
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

  getNewNotesForWeeks(semana){
     return this.http.get(this.newUrl + `?semana=${semana}`).pipe(
                  map((resp:any) => {
                    return resp;
                  })
                  )
  }


}
