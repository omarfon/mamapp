import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment, API_NOTAS } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EvolucionService {

  private SERVER = API_NOTAS;
  private apiUrl = `${this.SERVER}resumen?_sort=semana:asc`;

  constructor(private http: HttpClient) { }

  getSemanas() {
    return this.http.get(this.apiUrl + `?_sort=semana:asc`).pipe(
                      map((resp:any) =>{
                        return resp
                    })
    )
  }
  
}
