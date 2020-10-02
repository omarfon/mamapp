import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController, NavController } from '@ionic/angular';
import { PermissionsVideoService } from 'src/app/service/permissions-video.service';
import { API_IMAGES, OPENTELE } from 'src/environments/environment';


@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.page.html',
  styleUrls: ['./waiting.page.scss'],
})
export class WaitingPage implements OnInit {
  public dataDoctor: any;
  public SERVERImage = API_IMAGES;
  token: any;
  resultado;
  public permisionsData: any;

  constructor(public routes: ActivatedRoute,
    public router: Router,
    public permissionSrv: PermissionsVideoService,
    public alertCtrl: AlertController,
    public nav: NavController,
    public iab: InAppBrowser) {
    const data = this.routes.snapshot.paramMap.get('data');
    this.dataDoctor = JSON.parse(data);
    console.log('this.dataDoctor:', this.dataDoctor);
  }

  ngOnInit() {
    this.verifyToken();
  }

  verifyToken() {
    this.resultado = setInterval(() => {
      this.getPermissionVideo();
    }, 10000);

    /*  if (this.token != '') {
       clearInterval(this.resultado);
     } */
  }

  errorHandler(event) {
    event.target.src.style = "background-image:url(https://1.bp.blogspot.com/-p8EFlkXywyE/UDZvWTyr1bI/AAAAAAAAEU0/xL8pmKN1KOY/s1600/facebook.png); background-repeat: no-repeat; background-size:cover; height: 100vh;"
  }

  openVideo() {
    console.log('resultado de la data para permisos:', this.permisionsData, this.dataDoctor);
    const url = OPENTELE;
    const appId = encodeURIComponent(this.dataDoctor.appointmentId);
    const professional = encodeURIComponent(this.dataDoctor.professionalId);
    const professionalName = encodeURIComponent(this.dataDoctor.professionalName);
    const professionalLastName1 = encodeURIComponent(this.dataDoctor.professionalLastName1);
    const professionalLastName2 = encodeURIComponent(this.dataDoctor.professionalLastName2);
    const basicServiceDescription = encodeURIComponent(this.dataDoctor.basicServiceDescription);
    const patientId = encodeURIComponent(this.dataDoctor.patientId);
    const channel = encodeURIComponent(this.permisionsData.channel);
    let options = "location=yes,hidden=yes,beforeload=yes,hideurlbar=yes";
    const browser = this.iab.create(`${url}/telecon/%7B"appointmentId":${appId},"basicServiceDescription":"${basicServiceDescription}","professionalId":${professional},"professionalName":"${professionalName}","professionalLastName1":"${professionalLastName1}","professionalLastName2":"${professionalLastName2}","patientId":${patientId},"channel":"${channel}"%7D`, '_system', options);

  }


  getPermissionVideo() {
    let patientId = this.dataDoctor.patientId;
    let appoinmentid = this.dataDoctor.appointmentId;
    if (this.dataDoctor.familiar === true) {
      this.permissionSrv.getAuthoParent(appoinmentid, patientId).subscribe(async data => {
        this.token = data.token
        this.permisionsData = data;
        if (this.token === "") {
          console.log('aun no llega token');
        }
        else if (this.token === 'finalizado') {
          this.router.navigate(['home']);
          const alert = await this.alertCtrl.create({
            header: 'Cita Terminada',
            subHeader: 'Esta cita ya ha finalizado',
            buttons: [
              {
                text: 'ok'
              }
            ]
          });
          await alert.present();
          clearInterval(this.resultado);
        }
        else {
          /*  clearInterval(this.resultado); */
          const data = JSON.stringify(this.dataDoctor);
          this.openVideo();
          clearInterval(this.resultado);
          this.goToBack();
        }
        console.log(data);
      }, err => {
        console.log(err)
      })
    } else {
      this.permissionSrv.getPermissionsVideo(appoinmentid).subscribe(async data => {
        this.permisionsData = data;
        this.token = data.token
        if (this.token === "") {
          console.log('aun no llega token');
        }
        else if (this.token === 'finalizado') {
          this.router.navigate(['home']);
          const alert = await this.alertCtrl.create({
            header: 'Cita Terminada',
            subHeader: 'Esta cita ya ha finalizado',
            buttons: [
              {
                text: 'ok'
              }
            ]
          });
          await alert.present();
          clearInterval(this.resultado);
        }
        else {
          /*  clearInterval(this.resultado); */
          this.openVideo();
          clearInterval(this.resultado);
          this.goToBack();
        }
        console.log(data);
      }, err => {
        console.log(err)
      })
    }
  }

  goToBack() {
    clearInterval(this.resultado);
    this.nav.back();
  }

}
