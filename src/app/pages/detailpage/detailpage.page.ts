import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { AppointmentService } from '../../service/appointment.service';


@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.page.html',
  styleUrls: ['./detailpage.page.scss'],
})
export class DetailpagePage implements OnInit {

  public date;
  public dataArmada;
  public data;

  constructor(public alertCtrl: AlertController,
              public router: Router,
              public appointmentProvider: AppointmentService,
              public routes: ActivatedRoute,
              public navCtrl: NavController) { }

  ngOnInit() {
    this.data = this.routes.snapshot.paramMap.get('datosObj');
    this.dataArmada = JSON.parse(this.data);
    /* console.log(this.dataArmada); */
    this.date = this.dataArmada.appointmentId;
  }

  async desactivateTask(date){
   /*  console.log('el id a eliminar:',this.date); */
    const confirm = await this.alertCtrl.create({
      header: 'ELMINAR',
      message: '¿Estas seguro de eliminar esta cita?',
      buttons: [
        {
          text: 'SI',
          handler: data => {
            this.appointmentProvider.destroyAppointment(this.date).subscribe( async data => {
              this.router.navigate(['citas-pendientes']);
              const alert = await this.alertCtrl.create({
                  header:'cita eliminada',
                  message:"se ha eliminado satisfactoriamente la cita",
                  buttons:[
                    {
                      text:"ok",
                      handler: () =>{
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

  dismiss(){
    this.navCtrl.back();
  }

}
