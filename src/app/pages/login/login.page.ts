import { PopoverController, LoadingController, ModalController, Platform } from '@ionic/angular';
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
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { DataService } from '../../service/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public fecha;
  public cantidad;
  public startPregnancy: any;
  public _startPregnancy: any;
  public semanas;

  public msgError: string;
  private data;
  private key;
  public datos;
  public message: "";
  user: any = {};
  userData = null;
  datosFaceAuth: any;
  public documents;
  public tipeDocument: any;
  public document;
  /* @ViewChild('email', {static:true}) Loemail;
  @ViewChild('password', {static:true}) Lopassword; */

  constructor(public autho: AuthoService,
    public userSrv: UserService,
    public alertCtrl: AlertController,
    public router: Router,
    public events: Events,
    public datosSrv: DatosControlService,
    public popover: PopoverController,
    public chatSrv: ChatService,
    public loadinCtrl: LoadingController,
    public modalCtrl: ModalController,
    public fb: Facebook,
    public dataSrv: DataService,
    public plt: Platform) { 
      
    }

  ngOnInit() {
    const authorization = localStorage.getItem('authorization');
      if(!authorization) {
        this.autho.getKey().subscribe((data: any) => {
          localStorage.setItem('authorization', JSON.stringify(data));
        })
      }else{
        this.getDocuments();
      }
      console.log('constructor');
   
    
  }

  getDocuments(){
    this.dataSrv.getDocuments().subscribe(data => {
      this.documents = data;
      console.log(this.documents);
  });
}

  loginFb() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        /* this.user.img = 'https//graph.facebook.com/'+ res.authResponse.userID +'picture?type=square';  */
        this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
          this.datos = { email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'] };
          /* alert(JSON.stringify(this.datosFaceAuth)); */
          if (this.datos) {
            this.autho.loginWithFacebook(res.authResponse.accessToken).subscribe(async (data: any) => {
              console.log('data devuelta de middleware', data);
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
              this.goToCalc(localStorage.setItem('name', data.name));
            }, err => {
              this.openModalFaceUnconpleash(this.datosFaceAuth);
            })
            /*                   console.log('lo que esta guardado en this.datosFaceAuth',this.datosFaceAuth);
                              console.log('lo que viene en res:',res); */
          } else {
            alert(this.datos);
          }
          console.log('logged into facebook', res);
        })
          .catch(e => console.log('Error logging into Facebook', e));
      })
  }

  doSignIn(document, password) {
    console.log(this.tipeDocument,document, password) 
    this.userSrv.newLoginWithDni(this.tipeDocument, document, password).subscribe(async response => {
      this.data = response;
      console.log('lo que me trae el login:', this.data);
      if (this.data.sex == 'HOMBRE') {
        const alert = await this.alertCtrl.create({
          header: "LO SENTIMOS",
          subHeader: "Esta aplicación es de uso exclusivo para pacientes de sexo femenino",
          buttons: [
            {
              text: 'ok',
              role: 'cancel'
            }
          ]
        })
        await alert.present();
      } else {
        localStorage.setItem('authorization', JSON.stringify(response));
        localStorage.setItem('token', this.data.firebaseToken);
        localStorage.setItem('role', this.data.role);
        localStorage.setItem('name', this.data.name);
        localStorage.setItem('sigIn', 'completo');
   /*      localStorage.setItem('usuario', this.data.userEmail);
        localStorage.setItem('email', this.data.userEmail);
        localStorage.setItem('authorization', this.data.authorization);
        localStorage.setItem('id', this.data.patientId);
        localStorage.setItem('photoUrl', this.data.photoUrl);
        localStorage.setItem('patientName', this.data.patientName);
        localStorage.setItem('uid', this.data.userId);
        /* localStorage.setItem('uid', this.data.userId); */
        if (localStorage.getItem('token')) {
          const token = localStorage.getItem('token');
          this.chatSrv.registerCustom(token);
        }

        this.datosSrv.getStartPregnacy().subscribe((data: any) => {
          if (!data) {
            const nombre = localStorage.getItem('name');
            this.goToCalc(nombre);
            return
          }
          /* console.log('lo que devuelve el servicio startPregnancy:', this._startPregnancy); */
          /* this.startPregnancy = this._startPregnancy; */
          /* console.log('this.startPregnancy de login:', this.startPregnancy); */
          if (this.startPregnancy) {
            localStorage.setItem('startPregnancy', this.startPregnancy);
            this.router.navigate(['/tabs']);
          } else {
            this.goToCalc(localStorage.getItem('name'));
            /* this.router.navigateByUrl('/tabs'); */
          }
          // console.log('lo que me trae el login:', localStorage)
          this.events.publish('change:foto');
        }, err => {
          const name = localStorage.getItem('name');
          this.goToCalc(name);
          return
          
        });
      }
    }, async error => {
      const alert = await this.alertCtrl.create({
        header: '',
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

  async goToRegisterFacebook() {
    if (this.plt.is('android')) {
      this.loginFb();
    }
    if (this.plt.is('mobileweb')) {
      this.autho.FacebookAuth().then((res: any) => {
        this.datosFaceAuth = res;
        console.log('datos de facebok', this.datosFaceAuth);
        const imgPerfil = this.datosFaceAuth.photoURL;
        if (imgPerfil) {
          localStorage.setItem('imagenPerfil', imgPerfil);
        }
        const dataMiddle = {
          id: this.datosFaceAuth.additionalUserInfo.profile.id,
          autho: this.datosFaceAuth.credential.accessToken,
          email: this.datosFaceAuth.additionalUserInfo.profile.email,
          nombre: this.datosFaceAuth.additionalUserInfo.profile.first_name,
          lastname: this.datosFaceAuth.additionalUserInfo.profile.last_name,
          token: this.datosFaceAuth.credential.accessToken
        }
        console.log('data para Middle', dataMiddle);
        if (this.datosFaceAuth) {
          console.log('enviar datos a middleware');
          this.autho.loginWithFacebook(dataMiddle.token).subscribe(async (data: any) => {
            console.log('data devuelta de middleware', data);
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
          }, async err => {
            if (err.status === 400 || 404) {
              this.openModalFaceUnconpleash(this.datosFaceAuth);
            } else {

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
      }, async err => {
        console.log(err);
        const alert = await this.alertCtrl.create({
          header: "Problema con Facebook",
          subHeader: "Al parecer no puedes logearte con facebook intenta ingresando los datos manualmente",
          buttons: [
            {
              text: "Reintentar"
            },
            {
              text: "Registrarme",
              handler: () => {
                this.router.navigate(['/register']);
              }
            }
          ]
        });
        await alert.present();
      })
    }


  }
  async openModalFaceUnconpleash(data) {
    const modal = await this.modalCtrl.create({
      component: FaceRegisterComponent,
      animated: true,
      /*              showBackdrop:true, */
      backdropDismiss: true,
      cssClass: "wideModal",
      componentProps: {
        datos: data
      },

    });
    await modal.present();
  }

/*   async goToRecovery() {
    const alert = await this.alertCtrl.create({
      header: 'Olvidaste la Contraseña?',
      subHeader: 'Ingresa tu email para recuperar la contraseña',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Ingresa tu email'
        }
      ],
      buttons: [
        {
          text: 'enviar',
          cssClass: 'primary',
          handler: data => {
            let email = data.email;
            this.userSrv.sendValidation(email).subscribe(data => {
              this.datos = data
              if (this.datos.result = 'ok') {
                let dataObj = JSON.stringify(this.datos);
                this.router.navigate(['recoverycode', dataObj])
              } else {
                this.message = this.datos.error.message;
              }
            })
          }
        }
      ]
    })
    await alert.present();
  } */

  async goToRecovery(){
    const alert = await this.alertCtrl.create({
      header:"Olvidaste tu contraseña...?",
      message:'Ingresa tu N° de documento para recuperar',
      inputs :[
        {
          name:'documento',
          placeholder:'Ingresa tu n° de documento',
          type: 'text'
        }
      ],
      buttons :[
          {
            text:'Enviar',
            handler: data => {
              console.log('enviando correo electronico');
              let document = data.documento;
              console.log('lo que se almacena en correo:', document);
              const dataSend = {
                documentNumber:  data.documento,
                documentType: {
                  id:"1",
                  name:"D.N.I"
                },
                app: 'ebooking'
              }
              this.userSrv.recoveryLogin(dataSend).subscribe(data =>{
                  this.datos = data;
                  console.log('this.datos:', this.datos);
                  if(this.datos.result == 'ok'){
                    this.userSrv.recoveryData = this.datos;
                    this.userSrv.dataSend = dataSend;
                    this.router.navigate(['recoverycode']);
                  }else{

                  console.log('correo no valido levantar un alert o pintar un mensaje')
                  }
              })
            }
          }
      ]
    });
   await alert.present(); 
  }
  
  goToRegister() {

    this.router.navigate(['register']);
  }

  async goTohome() {
    const popover = await this.popover.create({
      component: FechaPregnancyComponent,
      backdropDismiss: true
    })
    await popover.present();
    /* this.router.navigate(['tabs']); */
  }

  recoveryCode() {
    this.router.navigate(['/code']);
  }

  async goToCalc(name) {
    const popover = await this.popover.create({
      component: CalcComponent,
      componentProps: {
        name: name
      },
      backdropDismiss: false,
      cssClass: 'popoverStyle'
    })
    await popover.present();
    /* this.router.navigate(['tabs']); */
  }

  selectDocument(d){
    const document = d.target.value;
    this.tipeDocument = document.id.toString();
    console.log(this.tipeDocument);
  }

}
