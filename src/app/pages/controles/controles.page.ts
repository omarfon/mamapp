import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { DatosControlService } from '../../service/datos-control.service';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { DetalleControlComponent } from 'src/app/components/detalle-control/detalle-control.component';


@Component({
  selector: 'app-controles',
  templateUrl: './controles.page.html',
  styleUrls: ['./controles.page.scss'],
})
export class ControlesPage implements OnInit {
  fechaIni: any;
  fechaFinal: string;
  encuentros: any;
  public message: boolean = false;
  public user: string;
  public usuario: string;
  public status;
  public sigIn;

  constructor(public datosControl: DatosControlService,
    public routes: Router,
    public alertCtrl: AlertController,
    public popover: PopoverController) { }

  async ionViewDidEnter() {
    this.sigIn = localStorage.getItem('sigIn');
    if (this.sigIn !== 'completo') {
      let alert = await this.alertCtrl.create({
        header: "Para visualizar tus citas",
        subHeader: "solo tienes que estar registrado y podrás ver lo que sucedio en la cita, también las recomendaciones de tu doctor",
        buttons: [
          {
            text: "Registrarme",
            handler: () => {
              console.log('enviarme al registro');
              this.routes.navigate(['/register']);
            }
          },
          {
            text: "Seguir sin Registrarme",
            handler: () => {
              this.routes.navigate(['/tabs']);
              console.log('ir a home');
            }
          }
        ],
        backdropDismiss: false
      });
      await alert.present();
    }
  }

  async ngOnInit() {
    const status = localStorage.getItem('status');
    if (status === 'unverified') {
      this.status = 'novalidado';
    } else {
      this.status = 'validado';
    }
    this.usuario = localStorage.getItem('role');
    if (this.usuario === 'public') {
      this.user = 'nouser'
    } else {
      this.user = 'user'
    }
    this.fechaIni = moment(localStorage.getItem('startPregnancy')).format('YYYY-MM-DD');
    // console.log('fecha inicio',this.fechaIni);
    let fechaFin = moment(localStorage.getItem('startPregnancy')).add(10, 'M').format('YYYY-MM-DD');
    this.fechaFinal = fechaFin

    this.datosControl.getParams(this.fechaIni, this.fechaFinal).subscribe((data: any) => {
      if (!data) {
        this.message = true;
      } else {
        this.encuentros = data.encuentros;
        console.log('this.encuentros:', this.encuentros);
      }
    }, err => {
      this.message = true;
      return
    });
    console.log('los encuentros:', this.encuentros);
  }

  goToDetail(encuentro) {
    console.log('el encuentro en goToDetail', encuentro);
    /* console.log('ira detalle de encuentro'); */
    let encuentroObj = JSON.stringify(encuentro)
    this.routes.navigate(['detailcontrol', encuentroObj]);
  }

  createDate() {
    const datos = {
      fechaIni: this.fechaIni,
      escogido: 44
    }
    const data = JSON.stringify(datos);
    /* console.log('mandar a la pagina citas', c); */
    this.routes.navigate(['/citas'])
  }

  createDatePediatric(){
      this.routes.navigate(['citas-pediatric'])
  }

  async openModal(ev: any) {
    const popover = await this.popover.create({
      component: DetalleControlComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async notTeleconsult() {
    const alert = await this.alertCtrl.create({
      header: "Proximamente Teleconsulta",
      subHeader: "Dentro de muy poco podrás tener teleconsultas, desde esta app....",
      buttons: [
        {
          text: 'entiendo',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }
}
