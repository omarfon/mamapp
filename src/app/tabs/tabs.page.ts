import { Component, Input } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public badge;
  public mensajeRecibido;
  public _badge: any = [];

  constructor(public afm: AngularFireMessaging) {}

  ngOnInit(){
    this.listen();
  }


      listen() {
        console.log('escuchando');
        this.afm.messages
        .subscribe((message) => { 
          console.log(message); 
          this.badge = this._badge.push([message]);
          console.log('lo que hay en el badge',this.badge, this.badge.length);
        });
      }
    
    badgeToCero(){
      this._badge = 0;
      this.badge = 0;
    }

}
