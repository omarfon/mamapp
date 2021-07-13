import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment, API_ENDPOINT } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private SERVER = API_ENDPOINT;
  private apiUrl = `${this.SERVER}ebooking/`;

  constructor(public http: HttpClient) { }

  getAppointmentsPeruser() {
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({ "Authorization": authorization });

    return this.http.get(this.apiUrl + 'citas-paciente?minutos=120', { headers }).pipe(
      map((resp: any) => {
        return resp;
      })/* .catch(e =>{
                      return Observable.of(e)
                    });
 */
    )
  }

  createAppointment(subida, provisionId) {
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({ "Authorization": authorization });
    let params = JSON.parse(subida);
    //params.email = localStorage.getItem('emailUser'); params.password = localStorage.getItem('passUser');
    // WARM: REFACTOR! Always provision_id will be 44. All json is passed. This will put in backend.
    params.provisions = [{ "default": false, "id": `${provisionId}` }]

    // console.log('appointment:',subida, params);
    return this.http.post(this.apiUrl + 'appointments/create', params, { headers }).pipe(
      map(data => {
        return data;
      })/* .catch(e =>{
                        return Observable.of(e)
                      }); */

    )
  }

  destroyAppointment(appointment) {
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({ "Authorization": authorization });
    // appointment.email = localStorage.getItem('emailUser'); appointment.password = localStorage.getItem('passUser');

    return this.http.delete(this.apiUrl + `appointments/${appointment}`, { headers }).pipe(
      map(data => {
        return data;
      })

    )
  }
}
