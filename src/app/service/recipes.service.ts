import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment, API_ENDPOINT } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private SERVER = API_ENDPOINT;
  private apiUrl = `${this.SERVER}ebooking/getPrescripcionesEncuentro?encuentroid=`;
  private apiAll =  `${this.SERVER}ebooking/getPrescripcionesEncuentro`;

  constructor(public http: HttpClient) { }

  getAllRecipes(){
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});
  
    return this.http.get(this.apiAll , {headers}).pipe(
                    map((resp:any)=>{
                      return resp
                    })    
    )
  }

  getRecipes(id){
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});

    return this.http.get(this.apiUrl + `${id}`, {headers}).pipe(
                      map((resp:any)=>{
                        return resp
                      })

    )

  }
}
