import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { AlertController, LoadingController, Events } from '@ionic/angular';


@Component({
  selector: 'app-code',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.scss'],
})
export class CodePage implements OnInit {

  private datos;
  private email;
  private code;
  public formCode: FormGroup;
  public createOk;

  public hora;
  public available;
  public doctor;

  public loginOk;
  public result;

  constructor(public form: FormBuilder,
              public routes: Router,
              public crudSrv: CrudService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public events: Events) { }

  ngOnInit() {

    this.formCode = this.form.group({
      primero : [],
      segundo : [],
      tercero : [],
      cuarto  : []
  });
  /* console.log(this.formCode.value);
  console.log(this.formCode.value.primero); */
  }

  saveData(){
    let codigo = this.formCode.value;
    let uno = codigo.primero;
    let dos = codigo.segundo;
    let tres = codigo.tercero;
    let cuatro = codigo.cuarto;
    let code = uno + dos + tres + cuatro;
    console.log(code);
    this.datos.code = code;
    this.datos.id = this.result.id;
    console.log('data armada:', this.datos);
    this.crudSrv.createNewUser(this.datos).subscribe(async (data:any) =>{
      this.createOk = data;
      /* console.log('la vuelta de this.createOK:', this.createOk); */
        if( this.createOk.ok == false ){
              const alert = await this.alertCtrl.create({
                header:'Error en el envio del código',
                message:`${this.createOk.error.message}`,
                buttons:[{
                  text:'Intentar de nuevo',
                  role: 'cancel'
                }]
              });
              await alert.present();
        }else{
          const loading = await this.loadingCtrl.create({
              message:"eniando código..."
          });
          await loading.present();
        this.createOk = data;
           /* console.log('datos que vienen del logueo: por registro:', this.createOk); */
             localStorage.setItem('idTokenUser', this.createOk.patientId);
             localStorage.setItem('emailUser', this.createOk.userEmail);
             localStorage.setItem('authorization', this.createOk.authorization);
             localStorage.setItem('role', this.createOk.role);
             localStorage.setItem('patientName', this.createOk.patientName);

             this.events.publish('user:logged', 'logged');
            /*  if(this.hora){
               // console.log(this.hora, this.doctor, this.available);
               this.routes.navigate(['financer'])
               this.navCtrl.setRoot(FinancerPage, {
                 doctor: this.doctor,
                 available: this.available,
                 hora: this.hora
               });
             }else{
                 this.navCtrl.setRoot(HomePage)
             } */
             this.routes.navigate(['tabs']);
             console.log("pasó!!!");
        // console.log('pasó logeado', this.createOk);
        loading.dismiss()
        }
    });
  }

  sendCode(){
    let email = {email:this.datos.email}
      this.crudSrv.validateEmail(email).subscribe(data=>{
          this.code = data;
          /* console.log('lo que me llega del vaildate:', this.code) */
      });
  }
}
