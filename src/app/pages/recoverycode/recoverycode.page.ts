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
  public recoveryData;
  public dataSend;
  public primero;
  public segundo;
  public tercero;
  public cuarto;
  public emailHash;
  constructor(public usrSrv: UserService,
              public form: FormBuilder,
              public alertCtrl: AlertController,
              public router: ActivatedRoute,
              public routes: Router,
              public events: Events,
              public nav: NavController) { }

  ngOnInit() {
     /* const dataObj = this.router.snapshot.paramMap.get('dataObj');
     this.datos = JSON.parse(dataObj); */
    /* console.log('this.datos:', this.datos); */

    this.formCode = this.form.group({
      primero : [],
      segundo : [],
      tercero : [],
      cuarto  : [],
      password   : ['', [Validators.required]],
      passwordRepeat   : ['', [Validators.required]]
  });

  this.recoveryData = this.usrSrv.recoveryData;
  this.emailHash = this.recoveryData.emailHash;
    this.dataSend = this.usrSrv.dataSend;
    console.log(this.recoveryData, this.dataSend);
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
    console.log('codigo:', codigo);
/*     let uno = codigo.primero;
    let dos = codigo.segundo;
    let tres = codigo.tercero;
    let cuatro = codigo.cuarto; */
    /* let code = uno + dos + tres + cuatro; */
    console.log(this.primero, this.segundo, this.tercero, this.cuarto);
    let datos = {
      code :`${this.primero}${this.segundo}${this.tercero}${this.cuarto}`,
      documentType : this.dataSend.documentType,
      dni : this.dataSend.documentNumber,
      id : this.recoveryData.id,
      password : codigo.password
    }
    /* console.log('datos.code:', this.datos); */
    // this.datos.id = this.code.id;
    // console.log('data armada:', this.datos);
    console.log(datos);
    this.usrSrv.loginRecovery(datos).subscribe(async data => {
        this.logeo = data;
        if(data){
          console.log('this.logeo:', this.logeo);
          this.recoverySuccess();
          this.routes.navigate(['login']);
    }
  },err =>{
    console.log('el logeo:', this.logeo, err);
    this.logeo = err;
      this.erroCode();
  });
}

async recoverySuccess(){
  const alert = await this.alertCtrl.create({
    header:"Cuenta recuperada",
    message:"su cuenta se ha recuperado exitosamente, ahora haga login",
    buttons: [
      {
        text:'ok'
      }
    ]
  })
  await alert.present();
}

async erroCode(){
  const alert = await this.alertCtrl.create({
    header:`Error en la recuperación`,
    message:`${this.logeo.error.message}`,
    buttons: ['volver a intentar']
  });
  await alert.present();
}

goToLogin(){
  /* this.navCtrl.setRoot(LoginPage); */
  this.routes.navigate(['login']);
  /* this.nav.navigateRoot(['login']); */
}

  sendCode(){
    console.log('enviar codigo');
    const dataSend = {
      documentNumber:  this.dataSend.documentNumber,
      documentType: {
        id:"1",
        name:"D.N.I"
      },
      app: 'ebooking'
    }
    this.usrSrv.recoveryLogin(dataSend).subscribe(async data =>{
      const alert = await this.alertCtrl.create({
        header:'Código de recuperación',
        message:'Hemos enviado nuevamente el código de verificación a tu correo electrónico.',
        buttons:[
          {
            text:"Ok"
          }
        ]
      });
      await alert.present();
        this.datos = data;
        console.log('this.datos:', this.datos);
        if(this.datos.result == 'ok'){
          this.usrSrv.recoveryData = this.datos;
          this.usrSrv.dataSend = dataSend;
        }else{
        console.log('correo no valido levantar un alert o pintar un mensaje')
        }
    })
  }
}
