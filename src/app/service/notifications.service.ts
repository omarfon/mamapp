import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
    public apiRegister ="https://dappapache02.eastus.cloudapp.azure.com/middleware2-copy/api/v2/auth/fcm-register"
    public apiNoti = "https://dappapache02.eastus.cloudapp.azure.com/middleware2-copy/api/v2/auth/fcm-notify?patient_id=2281";
    public apiCoach = "https://dappapache02.eastus.cloudapp.azure.com/middleware2-copy/api/v2/auth/fcm-notify-coach";

  constructor(public http: HttpClient) { }

  registerToken(tokenFcm){
      console.log('registrando token', tokenFcm);
    const authorization  = localStorage.getItem('authorization')
    let params = {token:tokenFcm}
    let headers = new HttpHeaders({"Authorization": authorization})
    console.log(params, headers, authorization);
    return this.http.post(this.apiRegister, params, {headers}).pipe(
            map(resp =>{
              return resp;
            })
        )
  }
  
  sendNotification(id, texto){
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});
    const params = {text: texto};
      return this.http.post(`${this.apiNoti}${id}`, params, {headers}).pipe(
        map(resp =>{
          return resp;
        })
      )          
  }

  sendNotificationCoach(text){
    console.log('texto notificacion coach:', text);
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});
    const params = {text: text};
      return this.http.post(this.apiCoach, params, {headers}).pipe(
        map(resp =>{
          return resp;
        })
      )       
  }
}
