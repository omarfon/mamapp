import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment, API_ENDPOINT } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthoService {

  /* private SERVER = Constants.API_ENDPOINT; */
  private SERVER = API_ENDPOINT;
  apiUrl = `${this.SERVER}users/public-authorization`;

  constructor(private http:HttpClient) { }

  getKey(){
    return this.http.get(this.apiUrl).pipe(
      map(data =>{
        return data
      })
    )
  }

}
