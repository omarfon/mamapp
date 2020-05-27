import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { TabsPage } from '../../tabs/tabs.page';
import { AppointmentService } from '../../service/appointment.service';
import { CulqiService } from '../../service/culqi.service';
declare var Culqi: any;
/* import * as Constants from  '../../../app/constants'; */



@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit {
  currentAppointment = null;
  private subida;
  private hour;
  public price;
  public pago;
  public depe;
  public dependCreate;
  public title;
  public amount;
  public description;
  /* public SERVERImage = Constants.IMAGESDOCTORS; */
  public  payCulqiCharges: boolean = true;
  public retrying:boolean = false;
  public alertError : any;
  public appointmentId ;
  
  

  nots = [
    { "id": "1", "name": "En local" },
    { "id": "2", "name": "Con tarjeta" },
  ];


  public doctor; //doctor seleccionado//
  public available; //fecha seleccionada//
  public hora; // fecha seleccionada
  private culqiData;
  private prestacion;
  /* private SERVERImage = Constants.IMAGESDOCTORS; */
  private plan;
  public desactivadoBoton = false;
  public desactivadoBotonLocal = false;
  public culqiReturn;
  public dataArmada;


  constructor(public loadCtrl:LoadingController,
              public router: Router,
              public routes: ActivatedRoute,
              public appointmentProvider: AppointmentService,
              public alertCtrl:AlertController,
              public culqiPrv: CulqiService) {}

  ngOnInit() {
    const data = this.routes.snapshot.paramMap.get('datosObj');
    this.dataArmada = JSON.parse(data);
    
      this.pago = 'enLocal';
      window['culqi']= this.culqi.bind(this);
      /* console.log('culqi en resumen:', window['culqi']); */
       this.culqiData = JSON.parse(localStorage.getItem('culqiData'));
       
     window['Culqi'].publicKey = 'pk_live_CyArY9ygzb0d7oZb'; 
      /* window['Culqi'].publicKey = 'pk_test_e85SD7RVrWlW0u7z'; */

      console.log('dataArmada en resumen:', this.dataArmada);
      this.hora = this.dataArmada.hora;
      this.doctor = this.dataArmada.doctor;
      this.price = this.dataArmada.plan.precio[0].total;
      this.subida = this.dataArmada.hora.listjson;
      this.plan = this.dataArmada.plan;
      this.available = this.dataArmada.available;
  }
  
  async culqi(){
    /* console.log('culqi del componente', this); */
    if(window['Culqi'].token){
      const getSettings = window['Culqi'].getSettings;
      const metadata = {
        patientId:this.currentAppointment.patient.id,
        appointmentId:this.currentAppointment.appointmentId,
        planId:this.plan.plan_pk,
        precioSinIGV:this.plan.precio[0].prest_precio_val,
        precioConIGV:this.plan.precio[0].total
      }
      const data = {
        amount : getSettings.amount,
        currency_code : getSettings.currency,
        email : window['Culqi'].token.email,
        source_id : window['Culqi'].token.id,
        metadata
      }
     /*  console.log('data:', data); */
      const loading = await this.loadCtrl.create({
          message:'pagando cita'
      });
      await loading.present();
      this.payCulqiCharges = true;
      const self = this;
        this.culqiPrv.charges(data).subscribe( async (vuelta:any) =>{
          /* console.log('data', vuelta); */
          loading.dismiss();
          this.payCulqiCharges = true;
          if(vuelta.message == "ok"){
            this.router.navigate(['tabs']);
            const alert = await this.alertCtrl.create({
              header: "Creación de cita",
              subHeader: "la cita que reservaste ha sido creada satisfactoriamente.",
              buttons: [
                {
                  text: "OK",
                  role: 'cancel'
                }
              ]
            });
            await alert.present();
          }else{
            /* console.log('data', vuelta); */
            this.alertError = this.alertCtrl.create({
                header:'error en tarjeta',
                subHeader: 'problema en el cargo en su tarjeta',
                buttons : [
                  {
                    text:'cerrar',
                    handler:()=>{
                    this.payCulqiCharges = true;
                    this.desactivadoBoton = true;
                    }
                  },
                  {
                    text:'ver mis citas',
                    handler: async ()=>{
                      this.router.navigate(['tabs']);
                      const alert = await this.alertCtrl.create({
                        header:"Pago en Clínica",
                        subHeader:'Tu pago no pudo ser realizado pero no te preocupes paga en la clínica tu cita fue reservada ...',
                        buttons:[
                          {
                            text:'ok'
                          }
                        ]
                      });
                      await alert.present();
                    }
                  }
                ]
            });
            this.alertError.present();
          }
        }, async err =>{
          console.log(err);
          console.log('eliminar cita', this.appointmentId);
          console.log('data err:', data);
          loading.dismiss();
          const alert = await this.alertCtrl.create({
            header:'Problema en el pago',
            message: `${err.error.result.responseData.user_message}`,
            buttons:[
              {
                text:'Reintentar'
              },
              {
                text:'cancelar'
              }
            ]});
          await alert.present()
        });
    }else{
      /* console.log('token error', window['Culqi'].error); */

    }
  }

 /*  dateValid(month: string, year: string) {
    return (group: FormGroup) => {
      let date = new Date();
      let monthInput = group.controls[month];
      let yearInput = group.controls[year];

      if (yearInput.value == date.getFullYear())
        if (monthInput.value < ("0" + (date.getMonth() + 1)).slice(-2))
          return monthInput.setErrors({ notEquivalent: true })
    }
  } */

   openCulqi() {
    /* const loadingPago = await this.loadCtrl.create({
      message: "Haciendo el cobro...",
    });
    await loadingPago.present(); */
    let appointment = this.currentAppointment;
    
    if(this.currentAppointment){
     /*  console.log('this.plan', this.plan); */
      const settings = {
        title : this.plan.plan_desc,
        description:this.plan.precio[0].prest_item_desc,
        currency: "PEN",
        amount: this.price * 100
      };
      /* console.log('settings:', settings); */

      window['Culqi'].options({
        style:{
          logo: 'https://api.aviva.pe/logo_aviva.png'
        }
      }) 
    window['Culqi'].settings(settings);

    /* console.log("open CUlqi", settings); */
    const metadata = {
      patientId:this.currentAppointment.patient.id,
      appointmentId:this.currentAppointment.appointmentId,
      planId:this.plan.plan_pk,
      precioSinIGV:this.plan.precio[0].prest_precio_val,
      precioConIGV:this.plan.precio[0].total
    }
    /* console.log('metadata:', metadata); */
    window['Culqi'].open();
    const i = setInterval(async ()=> {
      const culqiObj = window['Culqi'];
      /* console.log(culqiObj); */
      if (culqiObj['closeEvent'] != null) {
        console.log('Formulario culqi cerrado', culqiObj['closeEvent']);
        this.desactivateTask();
        clearInterval(i);
      }
      if (culqiObj['error'] != undefined){
        /* console.log('Formulario culqi error', culqiObj['error']); */
        clearInterval(i);
        const alert = await this.alertCtrl.create({
          header:'error al hacer cargo',
          message:'hubo un error alhacer cargo con la tarjeta',
          buttons:[
            {
              text:'reintentar',
              handler: ()=>{
                this.desactivadoBoton = true;
              }
            },
              {
              text:'Pagar en Clínica',
              handler:async ()=>{
                const alert = await this.alertCtrl.create({
                  header:"Pago en Clínica",
                  subHeader:'Tu pago no pudo ser realizado pero no te preocupes paga en la clínica tu cita fue reservada ...',
                  buttons:[
                    {
                      text:'ok'
                    }
                  ]
                });
                await alert.present();
                this.router.navigate(['tabs']);

              }
              }
          ]
        });
        await alert.present();
      }
    }, 1000);
    /* loadingPago.dismiss();  */
    } 
  }


  payCulqi() {
    this.desactivadoBoton = false;
      /* console.log('this.price:', this.price); */
      if(this.currentAppointment){
        /* console.log('this.currentAppoinment:', this.currentAppointment); */
        this.payCulqiCharges = true;
        this.openCulqi();
        return 
      }
    
      let provisionId = this.hora.params.provisionId;
      this.appointmentProvider.createAppointment(this.subida, provisionId)
        .subscribe((data: any) => {
          this.currentAppointment = data;
          console.log('currentAppointment:', this.currentAppointment); 
          this.appointmentId = this.currentAppointment.appointmentId;
          this.openCulqi();
        }, err => {
            if (this.currentAppointment !== null) {
              this.openCulqi();
              return;
            }
            console.log('err', err);
            if (!err) {
              return
            }
            const code = err.error.responseData.errorCode;
            let alert;
            switch (code) {
              case 15006:
                // case 15035:
                alert = this.alertCtrl.create({
                  header: 'Aviso al Cliente',
                  subHeader: 'Ya tienes una cita en una hora cercana a esta.',
                  buttons: [
                    {
                      text: 'Buscar otra hora',
                      handler: data => {
                        this.router.navigate(['tabs']);
                      }
                    }
                  ]
                });
                alert.present();
                break;

              case 15009:
              case 15035:
                alert = this.alertCtrl.create({
                  header: 'Aviso al Cliente',
                  subHeader: 'El horario escogido ya fue tomado .',
                  buttons: [
                    {
                      text: 'Buscar otra hora',
                      handler: data => {
                        this.router.navigate(['tabs']);
                      }
                    }
                  ],
                });
                alert.present();
                break;

              default:
                break;
            }
          });
    } 

  

  next() {
    let provisionId = this.hora.params.provisionId;
    this.desactivadoBotonLocal = false;
      this.appointmentProvider.createAppointment(this.subida , provisionId).subscribe(async (data:any) => {
        /* console.log('data devuelta:', data); */
        if(data.ok == false){
          const alert = await this.alertCtrl.create({
              header:"Problema de reserva",
              subHeader:`${data.error.help}`,
              buttons: [
                {
                text: 'Buscar otro horario',
                handler: ()=>{
                  /* this.navCtrl.push(CardPage); */
                  this.router.navigate(['tabs']);
                }
              },{
                text: 'cancelar',
                handler: ()=>{
                  this.router.navigate(['home']);
                  /* this.navCtrl.push(HomePage); */
                }
              }
            ]
          });
          alert.present();
        }else{
            const loading = await this.loadCtrl.create({
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
          this.router.navigate(['tabs']);
        } 
    });  
  }

  async gotosave(){
    this.desactivadoBotonLocal = false;
    const providerId = this.hora.params.provisionId;
    /* console.log('this.providerId:', providerId); */
    this.appointmentProvider.createAppointment(this.subida, providerId).subscribe(async (data: any) => {
      // console.log('data de masterDetail:', data);
      const loading = await this.loadCtrl.create({
        message: 'Creando cita...'
      });
      loading.present();
      /* this.navCtrl.setRoot(TabsPage); */
      this.router.navigate(['tabs']);
      loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Cita creada',
        subHeader: 'Su cita se ha creado satisfactoriamente',
        buttons: [
          {
            text: 'Ok',
            handler: data => {
            }
          }
        ]
      });
      alert.present();
    },
      err => {
        console.log('error de masterDetail:', err);
        const code = err.error.data.errorCode;
        let alert;
        /* switch (code) {
          case 15006:
            // case 15035:
            const alert = this.alertCtrl.create({
              header: 'Aviso al Cliente',
              subHeader: 'Ya tienes una cita en una hora cercana a esta.',
              buttons: [
                {
                  text: 'Buscar otra hora',
                  handler: data => {
                    this.router.navigate(['citas-pendientes']);
                  }
                }
              ]
            });
            const alert.present();
            break;

          case 15009:
            const alert = await this.alertCtrl.create({
              header: 'Aviso al Cliente',
              subHeader: 'El horario escogido ya fue tomado .',
              buttons: [
                {
                  text: 'Buscar otra hora',
                  handler: data => {
                    this.router.navigate(['citas-pendientes']);
                  }
                }
              ]
            });
            alert.present();
            break;

          default:
            break;
        } */
      }
    );
  }
  




  goBack(){
    /* this.navCtrl.pop(); */
  }  

   desactivateTask(){
   
             this.appointmentProvider.destroyAppointment(this.appointmentId).subscribe( async data => {
               console.log('eliminando cita', data);
             });
         }

}
