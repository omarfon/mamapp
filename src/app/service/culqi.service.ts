import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { API_ENDPOINT } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CulqiService {

  constructor(public http:HttpClient) { }

  /* private apiUrlCulqi = 'https://api.aviva.pe/middleware2/api/v2/ebooking/culqi-charges'; */
  /* private apiUrlCulqi = 'https://api.aviva.pe/middleware2-copy/api/v2/ebooking/culqi-charges'; */
   private apiUrlCulqi = `${API_ENDPOINT}ebooking/culqi-charges`; 

  charges(data ){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({ "Authorization": authorization.authorization });
    let params = data;
    return this.http.post(this.apiUrlCulqi , params, {headers}).pipe(
                  map(data =>{
                    return data;
                  })
                )
            }

}
