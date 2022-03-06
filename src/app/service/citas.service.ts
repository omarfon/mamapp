import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { API_ENDPOINT } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CitasService {
  servicios: any[] = [];
  doctores: any[] = [];
  public datosCita;

  private SERVER = API_ENDPOINT;
  private apiUrl = `${this.SERVER}`;

  constructor( public http: HttpClient) { }

  getServicios( ){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({ "Authorization": authorization.authorization });
    const center_id = 1;
    return this.http.get(this.apiUrl + `ebooking/fmt-centers/${center_id}/services`, {headers}).pipe(
                        map((resp:any)=>{
                          return resp;
                      })/* .catch(e =>{
                        return Observable.of(e)
                      }) */

    )
  }


  getDoctorsPerId(id){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({ "Authorization": authorization.authorization });
    const center_id = 1;

    return this.http.get(this.apiUrl + `ebooking/fmt-centers/${center_id}/services/${id}/professionals` ,  {headers}).pipe(
                    map((resp:any)=>{
                    this.doctores = resp.centers[0].services[0].professionals;
                    return this.doctores;
                    })/* .catch(e =>{
                      return Observable.of(e)
                    }) */
    )
  }

  getDoctorsSpecialtyBD(params: any) {
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    return this.http
      .get(this.apiUrl + 'ebooking/fmt-centers/1/basicservices/' + params + '/professionals/1/info-for-availables', {headers});
  }

  getDoctorsSlotsPerDay(data: any) {
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({"Authorization": authorization.authorization});
    let params = data;
    return this.http
      .post(this.apiUrl + 'ebooking/slots/availables-extra', params, {headers});
  }

  getDoctorsSpecialty(id, date1: any, date2: any) {
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({ "Authorization": authorization.authorization });
    return this.http
      .get(this.apiUrl + 'ebooking/fmt-centers/1/services/' + id + '/professionals/all/availables?from_date=' + date1 + '&to_date=' + date2, {headers});
  }


  
  getDoctorsPerIdFilter(id, provision){
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({ "Authorization": authorization.authorization });
    const center_id = 1;

    return this.http.get(this.apiUrl + `ebooking/fmt-centers/${center_id}/basicservices/${id}/provision/${provision}/professionals` ,  {headers}).pipe(
                    map((resp:any)=>{
                    this.doctores = resp.centers[0].services[0].professionals;
                    return this.doctores;
                    })/* .catch(e =>{
                      return Observable.of(e)
                    }) */
    )
  }

  /*  getAvailablesPerDay(serviceId ,fromDate, toDate){
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({
      "Authorization": authorization
    });
    // headers.append("Authorization", authorization);
    let params = {query: `query {centers{service(id:${serviceId}){id ,professionals{id, fullName, cmp, image, service{id, description }, availables(fromDateString:"${fromDate}",toDateString:"${toDate}"){date,hours{ hour, listjson}}}}}}`};
    return this.http.post(this.apiUrl, params, {headers})
                    .map((resp:any)=>{
                      return resp.data.centers[0].service.professionals;
                    });
  } */

  getAvailablesPerDoctor(id, escogido, serviceId, fromDate, toDate, ) : Observable<any>{
    const authorization = JSON.parse(localStorage.getItem('authorization'));
    let headers = new HttpHeaders({ "Authorization": authorization.authorization });

    const center_id = 1;
    return this.http.get(this.apiUrl + `ebooking/fmt-centers/${center_id}/basicservices/${serviceId}/professionals/${id}/provision/${escogido}/availables?from_date=${fromDate}&to_date=${toDate}`,  {headers}).pipe(
                      map((resp:any)=>{
                      /* console.log('resp:', resp); */
                        return resp.centers[0].services[0].professionals[0].availables;
                        // return resp;
                      })

    )
  }
}
