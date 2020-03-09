import { PopoverController, LoadingController, ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthoService } from '../../service/autho.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { AlertController, Events } from '@ionic/angular';
import { DatosControlService } from '../../service/datos-control.service';
import { TabsPage } from '../../tabs/tabs.page';
import { FechaPregnancyComponent } from '../../components/fecha-pregnancy/fecha-pregnancy.component';
import { CalcComponent } from 'src/app/components/calc/calc.component';
import { ChatService } from 'src/app/service/chat.service'; 
import { FacebookRegisterPage } from '../facebook-register/facebook-register.page';
import { FaceRegisterComponent } from 'src/app/components/face-register/face-register.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public fecha;
  public cantidad;
  public startPregnancy:any;
  public _startPregnancy:any;
  public semanas;

  public msgError: string;
  private data;
  private key;
  public datos;
  public message: "";
  /* @ViewChild('email', {static:true}) Loemail;
  @ViewChild('password', {static:true}) Lopassword; */

  constructor( public autho: AuthoService,
               public userSrv: UserService,
               public alertCtrl: AlertController,
               public router: Router,
               public events: Events,
               public datosSrv: DatosControlService,
               public popover: PopoverController,
               public chatSrv: ChatService,
               public loadinCtrl: LoadingController,
               public modalCtrl: ModalController) {}

               
ionViewDidEnter(){
  const authorization = localStorage.getItem('authorization');
  if(!authorization){ 
    this.autho.getKey().subscribe( (data:any) =>{
      localStorage.setItem('authorization', data.authorization );
      localStorage.setItem('role', data.role);
    })
  }
}
  ngOnInit() {

    /* this.Loemail.nativeElement.value = "";
    this.Lopassword.nativeElement.value = ""; */
   /*  const authorization = localStorage.getItem('authorization');
    if(!authorization){ 
      this.autho.getKey().subscribe( (data:any) =>{
        localStorage.setItem('authorization', data.authorization );
        localStorage.setItem('role', data.role);
      })
    } */
    
  }

  doSignIn(email, password){
    /* console.log(email, password) */
    this.userSrv.doSignIn(email, password).subscribe(async response =>{
       this.data = response;
       console.log('lo que me trae el login:', this.data);
       if(this.data.sex == 'HOMBRE'){
        const alert = await this.alertCtrl.create({
          header:"LO SENTIMOS",
          subHeader:"Esta aplicación es de uso exclusivo para pacientes de sexo femenino",
          buttons:[
            {
              text:'ok',
              role:'cancel'
            }
          ]
        })
        await alert.present();
      }else{
        localStorage.setItem('usuario', this.data.userEmail);
        localStorage.setItem('email', this.data.userEmail);
        localStorage.setItem('authorization', this.data.authorization);
        localStorage.setItem('id', this.data.patientId);
        localStorage.setItem('role', this.data.role);
        localStorage.setItem('photoUrl', this.data.photoUrl);
        localStorage.setItem('patientName', this.data.patientName);
        localStorage.setItem('name', this.data.name);
        localStorage.setItem('token', this.data.firebaseToken);
        localStorage.setItem('sigIn', 'completo');
        /* localStorage.setItem('uid', this.data.userId); */
        if(localStorage.getItem('token')){
          const token = localStorage.getItem('token');
          this.chatSrv.registerCustom(token);
        }
 
        this.datosSrv.getStartPregnacy().subscribe((data:any) =>{
          if(!data){
            const nombre = localStorage.getItem('nombre');
           this.goToCalc(nombre)
           return
          }
         /* console.log('lo que devuelve el servicio startPregnancy:', this._startPregnancy); */
         /* this.startPregnancy = this._startPregnancy; */
         /* console.log('this.startPregnancy de login:', this.startPregnancy); */
         if(this.startPregnancy){
           localStorage.setItem('startPregnancy', this.startPregnancy);
           this.router.navigateByUrl('/tabs');
         }else{
           this.goToCalc(localStorage.getItem('name'));
           /* this.router.navigateByUrl('/tabs'); */
         }
         // console.log('lo que me trae el login:', localStorage)
         this.events.publish('change:foto');
       },err =>{
        const name = localStorage.getItem('name');
        this.goToCalc(name);
        return
       });
      }
      },async error => {
        const alert = await this.alertCtrl.create({
          header:'',
          message: "Email o Password incorrecto",
          buttons: [{
            text: "Volver a intentar",
            handler: data => {
              // console.log('intentar de nuevo');
            }
          }]
        });
        await alert.present();
        // this.msgError = error.message;
 
        }

    );

  }
  async goToRegisterFacebook(){
    /* const loading = await this.loadinCtrl.create({
      message:"procesando petición"
    }) */
    /* await loading.present(); */
    this.autho.FacebookAuth().then((res:any)=>{
      const datos = res;
      console.log('datos de facebok', datos);
      const imgPerfil = datos.photoURL;
            if(imgPerfil){
              localStorage.setItem('imagenPerfil', imgPerfil);
            }
      const dataMiddle = {
        id : datos.additionalUserInfo.profile.id,
        autho: datos.credential.accessToken,
        email: datos.additionalUserInfo.profile.email,
        nombre: datos.additionalUserInfo.profile.first_name,
        lastname: datos.additionalUserInfo.profile.last_name,
        token: datos.credential.accessToken
      }
      console.log('dataMiddle', dataMiddle);
      if(datos){
          console.log('enviar datos a middleware');
          this.autho.loginWithFacebook(dataMiddle.token).subscribe(async (data:any) =>{
            console.log('data devuelta de middleware',data);
            localStorage.setItem('usuario', data.userEmail);
            localStorage.setItem('email', data.userEmail);
            localStorage.setItem('authorization', data.authorization);
        localStorage.setItem('id', data.patientId);
        localStorage.setItem('role', data.role);
        localStorage.setItem('photoUrl', data.photoUrl);
        localStorage.setItem('patientName', data.patientName);
        localStorage.setItem('name', data.name);
        localStorage.setItem('token', data.firebaseToken);
        localStorage.setItem('uid', data.userId);
        localStorage.setItem('sigIn', 'completo');
            this.goToCalc(dataMiddle.nombre);
          },async err=>{
            if(err.status === 404){
              const modal = await this.modalCtrl.create({
                component:FaceRegisterComponent,
                animated:true,
   /*              showBackdrop:true, */
                backdropDismiss:true,
                cssClass: "wideModal",
                componentProps:{
                  datos: datos
                },
                
              });
              await modal.present(); 
            }else{

            }
            console.log('error de login', err);
          })
          /* loading.dismiss(); */

      }/* else{
          console.log('pedir de nuevo a facebook');
      } */
      /* const parseo = datos.additionalUserInfo.profile;
      console.log('los datos de facebook en login', parseo);
      if(parseo){
        const data = JSON.stringify(parseo);
        localStorage.setItem('idFacebook', parseo.id);
        this.router.navigate(['/register', data]);
      } */
    },async err=>{
        console.log(err);
        const alert = await this.alertCtrl.create({
          header:"Problema con Facebook",
          subHeader:"Al parecer no puedes logearte con facebook intenta ingresando los datos manualmente",
          buttons:[
            {
              text:"Reintentar"
            },
            {
              text:"Registrarme",
              handler:()=>{
                this.router.navigate(['/register']);
              }
            }
          ]
        });
        await alert.present();
    })
  }

  async goToRecovery(){
    /* this.router.navigate(['register']); */
   const alert = await this.alertCtrl.create({
      header:'Olvidaste la Contraseña?',
      subHeader: 'Ingresa tu email para recuperar la contraseña',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Ingresa tu email'
        }
      ],
      buttons:[
        {
          text: 'enviar',
          cssClass: 'primary',
          handler: data =>{
            let email = data.email;
            this.userSrv.sendValidation(email).subscribe(data =>{
              this.datos = data
              if(this.datos.result = 'ok'){
                let dataObj = JSON.stringify(this.datos);
                  this.router.navigate(['recoverycode', dataObj])
              }else{
                  this.message = this.datos.error.message;
              }
            })
          }
        }
      ]
    })
    await alert.present();
   
  }

  goToRegister(){

    this.router.navigate(['register']);
  }

  async goTohome(){
    const popover = await this.popover.create({
      component:FechaPregnancyComponent,
      backdropDismiss: true
    })
    await popover.present();
    /* this.router.navigate(['tabs']); */
  }

  recoveryCode(){
    this.router.navigate(['/code']);
  }

  async goToCalc(name){
    const popover = await this.popover.create({
      component:CalcComponent,
      componentProps:{
        name:name
      },
      backdropDismiss: false,
      cssClass: 'popoverStyle'
    })
    await popover.present();
    /* this.router.navigate(['tabs']); */
  }


}
