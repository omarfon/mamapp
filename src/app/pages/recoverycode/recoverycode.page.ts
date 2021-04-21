import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { AlertController, Events, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recoverycode',
  templateUrl: './recoverycode.page.html',
  styleUrls: ['./recoverycode.page.scss'],
})
export class RecoverycodePage implements OnInit {

  private datos;
  public formCode: FormGroup;
  private code;
  public logeo;

  constructor(public usrSrv: UserService,
              public form: FormBuilder,
              public alertCtrl: AlertController,
              public router: ActivatedRoute,
              public routes: Router,
              public events: Events,
              public nav: NavController) { }

  ngOnInit() {
     const dataObj = this.router.snapshot.paramMap.get('dataObj');
     this.datos = JSON.parse(dataObj);
    /* console.log('this.datos:', this.datos); */

    this.formCode = this.form.group({
      primero : [],
      segundo : [],
      tercero : [],
      cuarto  : [],
      password   : ['', [Validators.required]],
      passwordRepeat   : ['', [Validators.required]]
  });

  }
  validacion(){
    const valid = this.formCode.value;
    if(valid.password == valid.passwordRepeat){
      return true;
    }else{
      return false;
    }
  }

  saveData(){
    let codigo = this.formCode.value;
    // console.log('codigo:', codigo);
    let uno = codigo.primero;
    let dos = codigo.segundo;
    let tres = codigo.tercero;
    let cuatro = codigo.cuarto;
    let code = uno + dos + tres + cuatro;
    // console.log(code);
    this.datos.code = code;
    this.datos.password = this.formCode.value.password;
    /* console.log('datos.code:', this.datos); */
    // this.datos.id = this.code.id;
    // console.log('data armada:', this.datos);

    this.usrSrv.recoveryLogin(this.datos).subscribe(async data => {
        this.logeo = data;
         if(this.logeo.ok == false){
          console.log('el logeo:', this.logeo);
          const alert = await this.alertCtrl.create({
            header:`Error en la recuperación`,
            message:`${this.logeo.error.message}`,
            buttons: ['volver a intentar']
          });
          await alert.present();
        }else{
          /* localStorage.setItem('usuario', this.logeo.userEmail);
         localStorage.setItem('email', this.logeo.userEmail);
         localStorage.setItem('authorization', this.logeo.authorization);
         localStorage.setItem('id', this.logeo.patientId);
         localStorage.setItem('role', this.logeo.role);
         localStorage.setItem('photoUrl', this.logeo.photoUrl);
         localStorage.setItem('patientName', this.logeo.patientName); */
          this.events.publish('user:logged', 'logged');
            console.log('this.logeo:', this.logeo);
            const alert = await this.alertCtrl.create({
              header:"Cuenta recuperada",
              message:"su cuenta se ha recuperado exitosamente",
              buttons: [
                {
                  text:'ok'
                }
              ]
            })
            await alert.present();
            /* this.navCtrl.setRoot(LoginPage); */
            /* this.routes.navigate(['login']); */
            localStorage.clear();
            this.nav.navigateRoot(['login']);
        }
      }, async err => {
        console.log(err);
        const alert = await this.alertCtrl.create({
          header:"Error en el envío",
          message: err.error.message,
          buttons: [
            {
              text:'Entiendo'
            }
          ]
        });
        alert.present();
      });
}


goToLogin(){
  /* this.navCtrl.setRoot(LoginPage); */
  this.routes.navigate(['login']);
  /* this.nav.navigateRoot(['login']); */
}

  sendCode(){
    console.log('enviar codigo');
  }
}
