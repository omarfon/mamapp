import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FinancerdatesService {

  private available:any;
  private doctor: any;
  private hora: any;
  private data: any;

  constructor() { }

  guardardatos( available, doctor, hora){
      this.available = available;
      this.doctor = doctor;
      this.hora = hora;
  }

  getDatos(){
    console.log(this.available);
    return  this.data = {
      available: this.available,
      doctor: this.doctor ,
      hora: this.hora
    }
  }
}
