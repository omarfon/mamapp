import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../service/appointment.service';
import { PermissionsVideoService } from 'src/app/service/permissions-video.service';
import { API_IMAGES, OPENTELE } from 'src/environments/environment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.page.html',
  styleUrls: ['./detailpage.page.scss'],
})
export class DetailpagePage implements OnInit {

  public date;
  public dataArmada;
  public data;
  public permisionsData: any;
  appointmentid: any;
  apiEndpoint: string;

  constructor(public alertCtrl: AlertController,
    public router: Router,
    public appointmentProvider: AppointmentService,
    public routes: ActivatedRoute,
    public navCtrl: NavController,
    public permissionSrv: PermissionsVideoService,
    public iab: InAppBrowser) { }

  ngOnInit() {
    this.apiEndpoint = API_IMAGES;
    this.data = this.routes.snapshot.paramMap.get('datosObj');
    this.dataArmada = JSON.parse(this.data);
    console.log(this.dataArmada);
    this.date = this.dataArmada.appointmentId;
  }

  errorHandler(event) {
    event.target.src = "https://1.bp.blogspot.com/-p8EFlkXywyE/UDZvWTyr1bI/AAAAAAAAEU0/xL8pmKN1KOY/s1600/facebook.png"
  }

  async desactivateTask() {
    /*  console.log('el id a eliminar:',this.date); */
    const confirm = await this.alertCtrl.create({
      header: 'ELMINAR',
      message: '¿Estas seguro de eliminar esta cita?',
      buttons: [
        {
          text: 'SI',
          handler: data => {
            this.appointmentProvider.destroyAppointment(this.date).subscribe(async data => {
              this.router.navigate(['citas-pendientes']);
              const alert = await this.alertCtrl.create({
                header: 'cita eliminada',
                message: "se ha eliminado satisfactoriamente la cita",
                buttons: [
                  {
                    text: "ok",
                    handler: () => {
                      return true;
                    }
                  }
                ]
              })
              await alert.present();
            });
          }
        },
        {
          text: 'NO',
          handler: () => {
            return true;
          }
        }
      ],
    });
    confirm.present();
  }

  back() {
    this.navCtrl.back();
  }

  /* openVideo() {
    this.router.navigate(['/video']);
  }
 */

  getpermissions() {
    this.appointmentid = this.dataArmada.appointmentId;
    if (this.dataArmada.familiar === true) {
      this.permissionSrv.getAuthoParent(this.appointmentid, this.dataArmada.patientId).subscribe(async data => {
        this.permisionsData = data;
        console.log('data', data);
        if (data.token === "") {
          const data = JSON.stringify(this.dataArmada);
          this.router.navigate(['waiting', data]);
          console.log('enviar a pagina de espera');
        }
        else if (data.token === 'finalizado') {
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
          this.router.navigate(['home']);
        } else {
          /* const data = JSON.stringify(this.task);
          this.router.navigate(['page-video', data]) */
          this.openVideo();
        }
      })
    } else {
      this.permisions();
    }
  }

  permisions() {
    this.permissionSrv.getPermissionsVideo(this.appointmentid).subscribe(async (data: any) => {
      console.log('data pedida desde my-date:', data);
      this.permisionsData = data;
      if (data.token === "") {
        const data = JSON.stringify(this.dataArmada);
        this.router.navigate(['waiting', data]);
        /* console.log('enviar a pagina de espera'); */
      }
      else if (data.token === 'finalizado') {
        const alert = await this.alertCtrl.create({
          header: 'Cita Terminada',
          subHeader: 'Esta cita ya ha finalizado, puedes ver el resumen en teleconsultas',
          buttons: [
            {
              text: 'ok'
            }
          ]
        });
        await alert.present();
        this.router.navigate(['home']);
      } else {
        const data = JSON.stringify(this.dataArmada);
        this.openVideo();
      }
    })
  }

  openVideo() {
    this.permisionsData;
    const url = OPENTELE;
    const appId = encodeURIComponent(this.dataArmada.appointmentId);
    const professional = encodeURIComponent(this.dataArmada.professionalId);
    const professionalName = encodeURIComponent(this.dataArmada.professionalName);
    const professionalLastName1 = encodeURIComponent(this.dataArmada.professionalLastName1);
    const professionalLastName2 = encodeURIComponent(this.dataArmada.professionalLastName2);
    const basicServiceDescription = encodeURIComponent(this.dataArmada.basicServiceDescription);
    const patientId = encodeURIComponent(this.dataArmada.patientId);
    const channel = encodeURIComponent(this.permisionsData.channel);
    console.log('resultado de la data para permisos:', this.permisionsData);
    let options = "location=yes,hidden=yes,beforeload=yes";
    const browser = this.iab.create(`${url}/telecon/%7B"appointmentId":${appId},"basicServiceDescription":"${basicServiceDescription}","professionalId":${professional},"professionalName":"${professionalName}","professionalLastName1":"${professionalLastName1}","professionalLastName2":"${professionalLastName2}","patientId":${patientId},"channel":"${channel}"%7D`, '_system', options);
  }


}
