import { FinancerService } from './../../service/financer.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../service/appointment.service';
import { AlertController, LoadingController, PopoverController} from '@ionic/angular';
/* import { DataFinancerService } from '../../resolver/data-financer.service'; */
import { InfonopagoComponent } from 'src/app/components/infonopago/infonopago.component';
import { popoverController } from '@ionic/core';
import { RegisterPage } from '../register/register.page';



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
  public nomark:boolean = false;
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

  constructor(public routes : Router,
              public route: ActivatedRoute,
              public appointmentSrv: AppointmentService,
              public financerSrv:
               FinancerService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
               /* public financerdatSrv: DataFinancerService,  */
              public appointmentProvider: AppointmentService,
              public popover: PopoverController) { }

  ngOnInit() {
  /*   const usuario = localStorage.getItem('role')
    if(usuario == 'public'){
        this.routes.navigate(['register']);
    } */
    const data = this.route.snapshot.paramMap.get('datosObj');
    this.dataArmada = JSON.parse(data);
    this.hora = this.dataArmada.hora;
    this.doctor = this.dataArmada.doctor;
    this.subida = this.dataArmada.hora.listjson;
    this.encuentro = this.dataArmada.encuentro;
    console.log('this.encuentro:',this.encuentro);
    /* this.available = this.dataArmada. */
   /*  console.log('dataArmada en financer:', this.dataArmada);
    console.log('dataArmada en doctor:', this.dataArmada.doctor); */

    if(this.dataArmada){
      this.getPlanesPacienteConPrecio();
    }
  }


  getPlanesPacienteConPrecio(){
    let centerId = this.dataArmada.centerId;
    let servicio_id = this.dataArmada.servicio_id;
    let prestacion_id = this.dataArmada.prestacion;
    let medico_id = this.dataArmada.medico_id;
    let proposedate = this.dataArmada.proposedate;
    this.financerSrv.getPlanesPaciente(centerId , servicio_id, prestacion_id , medico_id , proposedate ).subscribe(data =>{
      this.planes = data;
      console.log('this.planes:', this.planes);
      /* if(this.planes){
        if(this.planes.cuotas[0].countCuotas < 1){
          this.disabled = true;  
        }else{
          this.disabled = false;
        }
        console.log(this.disabled)
      }else{
        console.log('aun no hay planes');
      } */
    });
  }

  goToPay(){
    console.log(this.dataArmada);
    const datos = {
      available : this.dataArmada.proposedate,
      hora : this.hora,
      doctor : this.doctor,
      plan : this.plan,
    }
    console.log('me envia a pagos', datos);
    const datosObj = JSON.stringify(datos);
    console.log('data armada', datosObj);
    this.routes.navigate(['resumen', datosObj])
    
  }

  acceptFinancer(plan){
    this.financer = true; 
    this.paquete = false;
    this.desabilitado = true;
    this.plan = plan;
    this.price =  plan.precio[0].total ;
    this.nomark = true;
  }

  acceptFinancerPaquete(paquete){
    console.log('se cambia a botom pagar ahora y ya no va a resumenPage');
    this.paquete = true ;
    this.desabilitado = true;
    this.financer = false;
  }


   pagePaquete(){
    console.log('aqui se va defrente a pagar paquete con todos los datos');
    let provisionId = this.hora.params.provisionId;
    let subida = this.hora.listjson;
    console.log('datos antes de pagar:', provisionId, this.subida, this.hora);
    
       this.appointmentSrv.createAppointment(subida , provisionId).subscribe(async (data:any) => {
        console.log('data devuelta:', data);
         if(data.ok == false){
          const alert = await this.alertCtrl.create({
              header:'Problema de reserva',
              message:`${data.error.help}`,
              buttons: [
                {
                text: 'Buscar otro horario',
                handler: ()=>{
                  this.routes.navigate(['citas'])
                }
              },{
                text: 'cancelar',
                handler: ()=>{
                  this.routes.navigate(['home'])
                }
              }
            ]
          });
          await alert.present();
        } else{
            const loading =  await this.loadingCtrl.create({
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
    console.log('datos en next:',this.subida, provisionId);
    this.desactivadoBotonLocal = false;
      this.appointmentProvider.createAppointment(this.subida , provisionId).subscribe(async (data:any) => {
        console.log('data devuelta:', data);
        if(data.ok == false){
          const alert = await this.alertCtrl.create({
              header:"Problema de reserva",
              subHeader:`${data.error.help}`,
              buttons: [
                {
                text: 'Buscar otro horario',
                handler: ()=>{
                  /* this.navCtrl.push(CardPage); */
                  this.routes.navigate(['tabs']);
                }
              },{
                text: 'cancelar',
                handler: ()=>{
                  this.routes.navigate(['home']);
                  /* this.navCtrl.push(HomePage); */
                }
              }
            ]
          });
          alert.present();
        }else{
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

  async openModalInfo(){
    const popover = await this.popover.create({
        component:InfonopagoComponent,
      })
      await popover.present();
    }
     

}
