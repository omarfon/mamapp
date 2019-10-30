import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { IonContent, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMap, mergeMapTo } from 'rxjs/operators';
import { NotificationsService } from 'src/app/service/notifications.service';


interface Message {
  content:string
  type: string
  date: Date
  user: string
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @Output('badge') badge: any = [];
  public msg;
  public chat;
  public conversacion;
  public uid;
  currentUser = 'Claudia';
  public token;
  public _badge: any = [];
  /* public messaging = firebase.messaging(); */
  @ViewChild(IonContent, {static: false}) content: IonContent;

  constructor(public chatSrv: ChatService, 
              public alert: AlertController,
              public router: Router,
              public toast: ToastController,
              public afm: AngularFireMessaging,
              public notiSrv: NotificationsService) {

              }

  async ngOnInit() {
    this.badge = 0;
   if(localStorage.getItem('token') ){
      this.chatSrv.registerDb();
      this.obtenerConversacion(); 
    }else{
      this.obtenerConversacion();
    } 

    this.requestPermission();
      this.listen();
    
  
  }

  
  async makeToast(){
    const toast = await this.toast.create({
      message: "has habilitado las notificaciones de tu coach",
      duration: 5000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Entiendo'
    });
    toast.present();
  }

  async mensajeRecibido(){
    const toast = await this.toast.create({
      message:"Tu coach te esta escribiendo",
      duration: 5000,
      position: "top",
      showCloseButton: true,
    })
    toast.present();
  }

  requestPushNotificationsPermission() {
    const uid = localStorage.getItem('uid');
    this.afm.requestToken
      .subscribe(
        (token) => {
          this.makeToast();
          console.log('Permission granted! Save to the server!', token);
          this.chatSrv.registerToken(token, uid);
          this.notiSrv.registerToken(token).subscribe(data =>{
            console.log('data de registro:',data);
          }),err=>{
            console.log('err', err);
          }
        },
        (error) => {
          console.error(error);
        }
      );

  }

  requestPermission(){
    this.afm.requestPermission
        .pipe(mergeMapTo(this.afm.tokenChanges))
        .subscribe(
          (token) =>{ 
            this.makeToast();
            const uid = localStorage.getItem('uid');
            console.log('Permission granted! Save to the server!', token);
            this.chatSrv.registerToken(token, uid);
            this.notiSrv.registerToken(token).subscribe(data =>{
              console.log('data de registro:',data);
            }),err=>{
              console.log('err', err);
            }
          },
          (error) => {
            console.error(error);  
          }
        )
  }


  /* deleteToken() {
    this.afm.getToken
      .pipe(mergeMap(token => this.afm.deleteToken(token)))
      .subscribe(
        (token) => { console.log('Deleted!'); },
      );
  } */

  listen() {
    console.log('escuchando');
    this.afm.messages
    .subscribe((message) => { 
      this.mensajeRecibido();
      console.log(message); 
      /* this.badge = this._badge.push([message]);
      console.log('lo que hay en el badge',this.badge, this.badge.length); */
    });
  }


  
  /* async mensajePendiente(){
    const alert = await this.alert.create({
      header: 'trabajando en esta funcionalidad',
      subHeader:"podrás hablar con tu coach, en unos dias, te avisaremos ni bien este listo...",
      backdropDismiss:false,
      buttons:[
        {
          text:'entiendo',
          handler:()=>{
            this.router.navigate(['tabs']);
          }
        }
      ]
    })
    await alert.present();
  } */

  obtenerConversacion(){
    console.log(this.conversacion);
    const uid = localStorage.getItem('uid');
    this.chatSrv.getChatRoom(uid).subscribe( room =>{
      this.conversacion = room;
      console.log('this.conversacion:',this.conversacion);
    })
    setTimeout(()=>{
      this.content.scrollToBottom(300);
    },300) 
 } 
  

  sendMessage(){
    const mensaje : Message ={
      content: this.msg,
      type:'text',
      date: new Date(),
      user: localStorage.getItem('name'),
    }
    const uid = localStorage.getItem('uid');
    this.chatSrv.sendMessageToFirebase(mensaje, uid );
    const text = mensaje.content;
    console.log('text', text);
    this.notiSrv.sendNotificationCoach(text).subscribe(data =>{
      console.log('data de notificacion', data);
    }),err=>{
      console.log('err:',err);
    }
    this.msg = "";

    setTimeout(()=>{
      this.content.scrollToBottom(300);
    },500)
  }

}
