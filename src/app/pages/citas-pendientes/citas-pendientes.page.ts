import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { PermissionsVideoService } from 'src/app/service/permissions-video.service';



@Component({
  selector: 'app-citas-pendientes',
  templateUrl: './citas-pendientes.page.html',
  styleUrls: ['./citas-pendientes.page.scss'],
})
export class CitasPendientesPage implements OnInit {

  public dates = [];
  public _dates = [];
  public sinCitas: boolean = false;

  constructor(public appointmetSrv: AppointmentService,
    public router: Router,
    public nav: NavController,
    public alertCtrl: AlertController,
    public permissionSrv: PermissionsVideoService) {
  }

  ngOnInit() {
    /* console.log('citas-pendientes page'); */
    this.appointmetSrv.getAppointmentsPeruser().subscribe(data => {
      this.dates = data;
      console.log('this.dates:', this.dates);
    });
  }

  goToDetailDate(date) {
    const datosObj = JSON.stringify(date);
    /*  console.log('data armada', datosObj); */
    this.nav.navigateRoot(['detailpage', datosObj]);
  }

  /*  openVideo(date) {
     localStorage.setItem('doctor', date.professional.fullName);
     localStorage.setItem('idDoctor', date.professional.id);
     this.routes.navigate(['/video']);
   } */

  errorHandler(event) {
    event.target.src = "https://1.bp.blogspot.com/-p8EFlkXywyE/UDZvWTyr1bI/AAAAAAAAEU0/xL8pmKN1KOY/s1600/facebook.png"
  }



}
