import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, AlertController, LoadingController, Events, ModalController, PopoverController } from '@ionic/angular';
import { CrudService } from '../../service/crud.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-modal-code',
  templateUrl: './modal-code.component.html',
  styleUrls: ['./modal-code.component.scss'],
  
})
export class ModalCodeComponent implements OnInit {

  @Input ('data') data;
  @Input ('res') res;
  _gender: any;
  _documenType: any;
  resolve: any;

  private datos;
  private email;
  private code;
  public createOk;

  public hora;
  public available;
  public doctor;

  public loginOk;
  public result;
  public primero;
  public segundo;
  public message;


  constructor(public crudSrv: CrudService,
              public alertCtrl: AlertController,
              public form: FormBuilder,
              public loadingCtrl: LoadingController,
              public events: Events,
              public routes: Router,
              public modalCtrl: ModalController,
              public popover: PopoverController) { }
    
   ngOnInit() {
     const email = this.data.email;
     /* this.crudSrv.validateEmail(email).subscribe(async (data) =>{
          this.result = data;
    

        }) */
        this.datos = this.data;
        this.res = this.res;
        console.log('this.data', this.data);
        console.log('this.res', this.res);
}

  saveData(primero){
   
    console.log(primero);
    let code = primero;
    /* let dos = segundo;
    let tres = tercero;
    let cuatro = cuarto;
    let code = uno + dos + tres + cuatro; */
    console.log(code);
    this.datos.code = code;
    this.datos.gender = {
      id:3,
      name:"MUJER"
    };
    console.log('this.datos: ',this.datos);
    this.datos.id = this.res.id;
    console.log('data armada:', this.datos);
    this.crudSrv.createNewUser(this.datos).subscribe(async (data:any) =>{
      this.createOk = data;
      console.log('la vuelta de this.createOK:', this.createOk);
        
          const loading = await this.loadingCtrl.create({
              message:"enviando código..."
          }); 
          await loading.present();
        /* this.createOk = data; */
           console.log('datos que vienen del logueo: por registro:', this.createOk);
             localStorage.setItem('idTokenUser', this.createOk.patientId);
             localStorage.setItem('emailUser', this.createOk.email);
             //aqui debería venirme el authorization para poder cargarlo y hacer login de una sola vez!!!
             /* localStorage.setItem('authorization', this.createOk.authorization); */
             localStorage.setItem('role', this.createOk.role);
             localStorage.setItem('patientName', this.createOk.name);

             this.events.publish('user:logged', 'logged');
             this.routes.navigate(['/login']);
             this.loadingCtrl.dismiss();
             console.log("pasó!!!");
        // console.log('pasó logeado', this.createOk);
        /* await loading.dismiss(); */
        this.popover.dismiss();
        
      }, async err=>{
      this.message = "El código no es valido";
      const alert = await this.alertCtrl.create({
        header:'Error en el envio del código',
        message:`${this.createOk.error.message}`,
        buttons:[{
          text:'Intentar de nuevo',
          role: 'cancel'
        }]
      });
      await alert.present();
    });
  }

/*   sendCode(){
    let email = {email:this.datos.email}
      this.crudSrv.validateEmail(email).subscribe(data=>{
          this.code = data;
          console.log('lo que me llega del vaildate:', this.code)
      });
  } */


}
