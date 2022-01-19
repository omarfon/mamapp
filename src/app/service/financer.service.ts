import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { API_ENDPOINT } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancerService {

  private SERVER = API_ENDPOINT;
  private apiUrl = this.SERVER;

  constructor( public http: HttpClient) { }

  getFinancers(){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({ "Authorization": authorization.authorization });
    return this.http.get(this.apiUrl + 'ebooking/planes-paciente', {headers}).pipe(
                    map(data => {
                      return data
                  })/* .catch(e =>{
                      return Observable.of(e)
                    }); */

    )
  

}

getPrice(servicio_id, prestacion_id, producto_id, medico_id, proposed_date) {
  // let params = { proposed_date: proposed_date, center_id: center_id, basic_service_id: basic_service_id, doctor_id: doctor_id }
  const authorization = JSON.parse(localStorage.getItem('authorization'));
  let headers = new HttpHeaders({ "Authorization": authorization.authorization });
  return this.http.get(this.apiUrl + `ebooking/citas/precio-prestacion?servicio_id=${servicio_id}&prestacion_id=${prestacion_id}&producto_id=${producto_id}&medico_id=${medico_id}&fecha=${proposed_date}`, {headers}).pipe(
                  map(data => {
                    return data
                  })/* .catch(e =>{
                    return Observable.of(e)
                  }); */

  )
}

getPlanesPaciente(centerId, servicio_id, prestacion_id, medico_id, proposed_date){
  const authorization = JSON.parse(localStorage.getItem('authorization'));
  let headers = new HttpHeaders({ "Authorization": authorization.authorization });

    return this.http.get(this.apiUrl + `ebooking/planes-paciente-precio-prestacion?center_id=${centerId}&servicio_id=${servicio_id}&prestacion_id=${prestacion_id}&medico_id=${medico_id}&fecha=${proposed_date}`, {headers}).pipe(
                    map(data=>{
                      return data
                    })/* .catch(e =>{
                      return Observable.of(e)
                    }); */
    )
}
}
