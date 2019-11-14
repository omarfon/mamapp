import { Component, Input } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public badge = 0;
  public mensajeRecibido;
  public _badge: any = [];

  constructor(public afm: AngularFireMessaging) {}

  ngOnInit(){
    this.listen();
    this.badge = 0;
    console.log('this._badge:', this._badge);
  }


      listen() {
        console.log('escuchando');
        this.afm.messages
        .subscribe((message) => { 
          console.log(message); 
          this.badge = this._badge.push([message]);
          console.log('lo que hay en el badge',this.badge);
        });
      }
    
    badgeToCero(){
      this._badge = [];
      this.badge = 0;
    }

}
