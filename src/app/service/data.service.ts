import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private SERVER = API_ENDPOINT;
  private apiUrl = `${this.SERVER}users/`;

  constructor(public http: HttpClient) { }

  getGenders(){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    return this.http.get(this.apiUrl + 'genders', {headers}).pipe(
              map(data =>{
                return data;
              })/* .catch(e =>{
                return Observable.of(e)
              }); */
    )
  }

  getDocuments(){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});

    return this.http.get(this.apiUrl + 'documenttypes', {headers}).pipe(
                  map(data =>{
                    return data;
                  })/* .catch(e =>{
                    return Observable.of(e)
                  }); */
    )
  }

}
