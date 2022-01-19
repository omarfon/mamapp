import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_ENDPOINT } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})

export class NotificationsService {
    public SERVER = API_ENDPOINT ; 
    public apiRegister =`${this.SERVER}auth/fcm-register`
    public apiNoti = `${this.SERVER}auth/fcm-notify?patient_id=2281`;
    public apiCoach = `${this.SERVER}auth/fcm-notify-coach`;

  constructor(public http: HttpClient) { }

  registerToken(tokenFcm){
      console.log('registrando token', tokenFcm);
      let params = {token:tokenFcm}
      const authorization = JSON.parse(localStorage.getItem('authorization'));
      let headers = new HttpHeaders({ "Authorization": authorization.authorization });
    console.log(params, headers, authorization);
    return this.http.post(this.apiRegister, params, {headers}).pipe(
            map(resp =>{
              return resp;
            })
        )
  }
  
  sendNotification(id, texto){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({ "Authorization": authorization.authorization });
    const params = {text: texto};
      return this.http.post(`${this.apiNoti}${id}`, params, {headers}).pipe(
        map(resp =>{
          return resp;
        })
      )          
  }

  sendNotificationCoach(text){
    console.log('texto notificacion coach:', text);
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({ "Authorization": authorization.authorization });
    const params = {text: text};
      return this.http.post(this.apiCoach, params, {headers}).pipe(
        map(resp =>{
          return resp;
        })
      )       
  }
}
