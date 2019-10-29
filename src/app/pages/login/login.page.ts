import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthoService } from '../../service/autho.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { AlertController, Events } from '@ionic/angular';
import { DatosControlService } from '../../service/datos-control.service';
import { TabsPage } from '../../tabs/tabs.page';
import { FechaPregnancyComponent } from '../../components/fecha-pregnancy/fecha-pregnancy.component';
import { CalcComponent } from 'src/app/components/calc/calc.component';
import { ChatService } from 'src/app/service/chat.service';


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

  constructor( public autho: AuthoService,
               public userSrv: UserService,
               public alertCtrl: AlertController,
               public router: Router,
               public events: Events,
               public datosSrv: DatosControlService,
               public popover: PopoverController,
               public chatSrv: ChatService) {

            /*     const authorization = localStorage.getItem('authorization');
                
                  this.autho.getKey().subscribe( (data:any) =>{
                    localStorage.setItem('authorization', data.authorization );
                    localStorage.setItem('role', data.role);
                  }) */
                
                }

  ngOnInit() {
    const authorization = localStorage.getItem('authorization');
    if(!authorization){
      this.autho.getKey().subscribe( (data:any) =>{
        localStorage.setItem('authorization', data.authorization );
        localStorage.setItem('role', data.role);
      })
    }
    
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
        localStorage.setItem('token', this.data.firebaseToken);
        /* localStorage.setItem('uid', this.data.userId); */
        localStorage.setItem('name', this.data.name);
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
         this.startPregnancy = data.fecha_ultima_regla;
         
         /* console.log('lo que devuelve el servicio startPregnancy:', this._startPregnancy); */
         /* this.startPregnancy = this._startPregnancy; */
         /* console.log('this.startPregnancy de login:', this.startPregnancy); */
         if(this.startPregnancy){
           localStorage.setItem('startPregnancy', this.startPregnancy);
           this.router.navigateByUrl('/tabs');
         }
         // console.log('lo que me trae el login:', localStorage)
         this.events.publish('change:foto');
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
            /* this.router.navigate(['home']); */
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

  async goToCalc(nombre){
    const popover = await this.popover.create({
      component:CalcComponent,
      componentProps:{
        nombre:nombre
      },
      backdropDismiss: true
    })
    await popover.present();
    /* this.router.navigate(['tabs']); */
  }


}
