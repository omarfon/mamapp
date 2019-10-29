import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-citas-pendientes',
  templateUrl: './citas-pendientes.page.html',
  styleUrls: ['./citas-pendientes.page.scss'],
})
export class CitasPendientesPage implements OnInit {

  public dates = [];
  public _dates = [] ;
  public sinCitas: boolean = false;

  constructor(public appointmetSrv: AppointmentService,
              public routes: Router,
              public nav: NavController) {
              }
              
  ngOnInit() {
                /* console.log('citas-pendientes page'); */
        this.appointmetSrv.getAppointmentsPeruser().subscribe(data =>{
          return this.dates = data;
        })
  }

  goToDetailDate(date){
    const datosObj = JSON.stringify(date);
   /*  console.log('data armada', datosObj); */
    this.nav.navigateRoot(['detailpage', datosObj]);
  }

}
