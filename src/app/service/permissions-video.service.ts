import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { API_ENDPOINT } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PermissionsVideoService {

  private SERVER = API_ENDPOINT;
  private url = `${this.SERVER}ebooking/token-paciente?appointmentid=`;
  private urlAutho = `${this.SERVER}ebooking/token-paciente-contacto?patientid=`;

  constructor(public http: HttpClient) { }

  getPermissionsVideo(appointmentid) {
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({ "Authorization": authorization });

    return this.http.get(this.url + appointmentid, { headers }).pipe(
      map((resp: any) => {
        return resp
      })/* .catch(e =>{
                console.log('error desde el servidor:',e);
              }) */
    )
  }


  getPermissionsVideoParent(appointmentid, autho) {
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({ "Authorization": authorization });

    return this.http.get(this.url + appointmentid, { headers }).pipe(
      map((resp: any) => {
        return resp
      })/* .catch(e =>{
                console.log('error desde el servidor:',e);
              }) */
    )
  }

  getAuthoParent(patientId, appointmentid) {
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({ "Authorization": authorization });

    return this.http.get(this.urlAutho + `${appointmentid}&appointmentid=${patientId}`, { headers }).pipe(
      map((resp: any) => {
        return resp
      })
    )
  }
}
