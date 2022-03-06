import { FinancerService } from './../../service/financer.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../service/appointment.service';
import { AlertController, LoadingController, PopoverController } from '@ionic/angular';
/* import { DataFinancerService } from '../../resolver/data-financer.service'; */
import { InfonopagoComponent } from 'src/app/components/infonopago/infonopago.component';
import { popoverController } from '@ionic/core';
import { RegisterPage } from '../register/register.page';
import { CitasService } from '../../service/citas.service';



@Component({
  selector: 'app-financer',
  templateUrl: './financer.page.html',
  styleUrls: ['./financer.page.scss'],
})
export class FinancerPage implements OnInit {
  public hora;
  public doctor;
  public available;
  public proposedate;
  public plan;
  public planes;
  public desabilitado: boolean = false;
  public nomark: boolean = false;
  public price;
  public paquete: boolean = false;
  public desabilitadoPaquete: boolean = false;
  public subida;
  public datos;
  public dataArmada;
  desactivadoBotonLocal: boolean;
  public financer: boolean;
  public disabled: boolean = false;
  public encuentro;
  public data;
  public dataEscogida;
  doctorSubida: any;
  constructor(public routes: Router,
    public route: ActivatedRoute,
    public appointmentSrv: AppointmentService,
    public financerSrv:
      FinancerService,
    public alertCtrl: AlertController,
    public citasSrv: CitasService,
    public loadingCtrl: LoadingController,
    /* public financerdatSrv: DataFinancerService,  */
    public appointmentProvider: AppointmentService,
    public popover: PopoverController) { }

  ngOnInit() {
    
    this.dataEscogida = this.citasSrv.datosCita;
    const datosListJson = JSON.parse(this.dataEscogida.listjson);
    console.log(this.dataEscogida, datosListJson);
    this.dataArmada = this.dataEscogida.params;
    this.hora = this.dataEscogida.hora;
    this.doctor = datosListJson.professional.id;
    this.doctorSubida = datosListJson.professional;
    this.subida = this.dataEscogida.listjson;
    this.encuentro =  datosListJson.appointmentDateTime; ;
    console.log('this.encuentro:', this.encuentro);
    if (this.dataEscogida) {
      this.getPlanesPacienteConPrecio();
    }
  }


  async getPlanesPacienteConPrecio() {
    const loading = await this.loadingCtrl.create({
      message: 'cargando financiadores'
    });
    let centerId = this.dataEscogida.params.centerId;
    let servicio_id = this.dataEscogida.params.serviceId;
    let prestacion_id = this.dataEscogida.params.provisionId[0];
    let medico_id = this.doctor;
    let proposedate = this.encuentro;
    this.financerSrv.getPlanesPaciente(centerId, servicio_id, prestacion_id, medico_id, proposedate).subscribe((data: any) => {
      this.planes = data;
      loading.dismiss();
      console.log('this.planes:', this.planes);
    });
  }
  

  goToPay() {
    console.log(this.dataArmada);
    const datos = {
      available: this.encuentro,
      hora: this.dataEscogida,
      doctor: this.doctorSubida,
      plan: this.plan,
      listjson: this.subida
    }
    this.citasSrv.datosCita = datos;
    console.log('me envia a pagos', datos);
    const datosObj = JSON.stringify(datos);
    console.log('data armada', datosObj);
    this.routes.navigate(['resumen'])

  }

  async acceptFinancer(plan) {
    if (plan.siteds === 1) {
      this.paquete = true;
      this.financer = false
      const alert = await this.alertCtrl.create({
        header: 'Reserva con seguro',
        subHeader: 'podrás registrar tu cita y pagar en local, el monto a cobrar será el copago de tu aseguradora',
        buttons: [
          {
            text: 'entiendo'
          }
        ]
      });
      await alert.present();
    } else {
      this.paquete = false;
      this.financer = true;
    }
    this.desabilitado = true;
    this.plan = plan;
    this.price = plan.precio[0].total;
    this.nomark = true;
  }

  async acceptFinancerPaquete(plan) {
    if (plan.codigo_garante_pk === 1) {
      this.paquete = true;
      this.financer = false
      const alert = await this.alertCtrl.create({
        header: 'Reserva con plan materno',
        subHeader: 'Podras registrar tu consulta con los beneficios de tu plan seleccionado.',
        buttons: [
          {
            text: 'entiendo'
          }
        ]
      });
      await alert.present();
    } else {
      this.paquete = false;
      this.financer = true;
    }
    console.log('se cambia a botom pagar ahora y ya no va a resumenPage');
    this.paquete = true;
    this.desabilitado = true;
    this.financer = false;
  }


  pagePaquete() {
    console.log('aqui se va defrente a pagar paquete con todos los datos');
    let provisionId = this.hora.params.provisionId;
    let subida = this.hora.listjson;
    console.log('datos antes de pagar:', provisionId, this.subida, this.hora);

    this.appointmentSrv.createAppointment(subida, provisionId).subscribe(async (data: any) => {
      console.log('data devuelta:', data);
      if (data.ok == false) {
        const alert = await this.alertCtrl.create({
          header: 'Problema de reserva',
          message: `${data.error.help}`,
          buttons: [
            {
              text: 'Buscar otro horario',
              handler: () => {
                this.routes.navigate(['citas'])
              }
            }, {
              text: 'cancelar',
              handler: () => {
                this.routes.navigate(['home'])
              }
            }
          ]
        });
        await alert.present();
      } else {
        const loading = await this.loadingCtrl.create({
          message: "creando cita"
        });
        await loading.present();
        const alert = await this.alertCtrl.create({
          header: "Creación de cita",
          subHeader: "la cita que reservaste ha sido creada satisfactoriamente.",
          buttons: [
            {
              text: "Ok",
              role: "Cancel"
            }
          ]
        });
        loading.dismiss();
        alert.present();
        this.routes.navigate(['home'])
      }
    });
  }

  next() {
    const provisionId = this.hora.params.provisionId;
    console.log('datos en next:', this.subida, provisionId);
    this.desactivadoBotonLocal = false;
    this.appointmentProvider.createAppointment(this.subida, provisionId).subscribe(async (data: any) => {
      console.log('data devuelta:', data);
      if (data.ok == false) {
        const alert = await this.alertCtrl.create({
          header: "Problema de reserva",
          subHeader: `${data.error.help}`,
          buttons: [
            {
              text: 'Buscar otro horario',
              handler: () => {
                /* this.navCtrl.push(CardPage); */
                this.routes.navigate(['tabs']);
              }
            }, {
              text: 'cancelar',
              handler: () => {
                this.routes.navigate(['home']);
                /* this.navCtrl.push(HomePage); */
              }
            }
          ]
        });
        alert.present();
      } else {
        const loading = await this.loadingCtrl.create({
          message: "creando cita"
        });
        loading.present();
        const alert = await this.alertCtrl.create({
          header: "Creación de cita",
          subHeader: "la cita que reservaste ha sido creada satisfactoriamente.",
          buttons: [
            {
              text: "Ok",
              role: "Cancel"
            }
          ]
        });
        loading.dismiss();
        await alert.present();
        /* this.navCtrl.setRoot(HomePage); */
        this.routes.navigate(['tabs']);
      }
    });
  }

  async openModalInfo() {
    const popover = await this.popover.create({
      component: InfonopagoComponent,
    })
    await popover.present();
  }


}
