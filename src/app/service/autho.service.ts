import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { API_ENDPOINT } from '../../environments/environment';
import {auth} from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class AuthoService {

  /* private SERVER = Constants.API_ENDPOINT; */
  private SERVER = API_ENDPOINT;
  apiUrl = `${this.SERVER}users/public-authorization`;
  apiUrlFacebook = `${this.SERVER}auth/facebook-validate?app=mama&access_token=`;
  apiRegisterFacebook = `${this.SERVER}users/facebook-register?app=mama`;

  constructor(private http:HttpClient,
              public afAuth: AngularFireAuth) { }

  getKey(){
    return this.http.get(this.apiUrl).pipe(
      map(data =>{
        return data
      })
    )
  }

  FacebookAuth(){
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }

  loginWithFacebook(token){
    const authorization = localStorage.getItem('authorization');
    /* let headers = new HttpHeaders({'Authorization': authorization}); */

/*     let params = {data: dataMiddle, app:"mama"} */

    return this.http.get(`${this.apiUrlFacebook}${token}` ).pipe(
                    map(data =>{
                      return data
                    })
    ) 
    /* return dataMiddle; */
  }

  registerWithFacebook(data){
    let params = data;
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({'Authorization': authorization});
      return this.http.post(this.apiRegisterFacebook, params, {headers}).pipe(
        map(res =>{
          return res
        })
      )
  }


  AuthLogin(provider){
    provider.addScope('user_birthday');
    provider.addScope('user_gender');
    provider.addScope('user_photos');
    return this.afAuth.auth.signInWithPopup(provider)
                .then((result)=>{
                      console.log('Te has logeado satisfactoriamente', result);
                      return result;
                }).catch((err)=>{
                  console.log(err);
                })
  }

}
