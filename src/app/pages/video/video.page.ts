import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { WebRtcService } from 'src/app/service/web-rtc.service';

import { Router, ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/service/appointment.service';
import { NavController } from '@ionic/angular';
import moment from 'moment';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  @Input('date') date
  topVideoFrame = 'partner-video';
  userId: string;
  partnerId: string;
  myEl: HTMLMediaElement;
  partnerEl: HTMLMediaElement;
  hora;


  title = 'angular-video';
  localCallId = 'agora_local';
  remoteCalls: string[] = [];


  private uid: number;
  public dates;
  public nombreDoctor;
  public idDoctor;
  public time;

  constructor(private webRTC: WebRtcService,
    private elRef: ElementRef,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private appointmetSrv: AppointmentService,
    private nav: NavController) {
    this.uid = Math.floor(Math.random() * 100);
  }
  ngOnInit() {


    this.nombreDoctor = localStorage.getItem('doctor');
    this.idDoctor = localStorage.getItem('idDoctor')


  }


  closePage() {
    this.nav.back();
  }


  mute() {
    console.log('cerrando video');
  };


  /*  dejar(){
 
     this.ngxAgoraService.client.on('peer-leave', (evt) => {
       const stream = evt.stream;
       if (stream) {
         stream.stop();
         this.remoteCalls = this.remoteCalls.filter(call => call === `#agora_remote${stream.getId()}`);
         console.log(`${evt.uid} left from this channel`);
       }
     });
   }-
   remove(){
     this.ngxAgoraService.client.on('stream-removed', (evt) => {
       const stream = evt.stream;
       stream.stop();
       this.remoteCalls = this.remoteCalls.filter(call => call === `#agora_remote${stream.getId()}`);
       console.log(`Remote stream is removed ${stream.getId()}`);
     });
   } */
  removeVideo() {

  }

}
