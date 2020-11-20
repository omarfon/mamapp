import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { WebRtcService } from 'src/app/service/web-rtc.service';
import { NgxAgoraService, Stream, AgoraClient, ClientEvent, StreamEvent } from 'ngx-agora';
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

  private client: AgoraClient;
  private localStream: Stream;
  private uid: number;
  public dates;
  public nombreDoctor;
  public idDoctor;
  public time;

  constructor(private webRTC: WebRtcService,
    private elRef: ElementRef,
    private router: Router,
    private ngxAgoraService: NgxAgoraService,
    private activateRoute: ActivatedRoute,
    private appointmetSrv: AppointmentService,
    private nav: NavController) {
    this.uid = Math.floor(Math.random() * 100);
  }
  ngOnInit() {
    this.crhono();

    this.nombreDoctor = localStorage.getItem('doctor');
    this.idDoctor = localStorage.getItem('idDoctor')

    this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
    this.assignClientHandlers();

    this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
    this.assignLocalStreamHandlers();
    this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
  }

  crhono() {
    setInterval(() => {
      this.updateTime();
    }, 1000)
  }

  updateTime() {
    this.time = moment().format('hh:mm:ss');
  }

  join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    this.client.join(null, 'foo-bar', this.uid, onSuccess, onFailure);
  }

  publish(): void {
    this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
  }

  private assignLocalStreamHandlers(): void {
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      console.log('accessAllowed');
    });


    this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      console.log('accessDenied');
    });
  }

  private initLocalStream(onSuccess?: () => any): void {
    this.localStream.init(
      () => {

        this.localStream.play(this.localCallId);
        if (onSuccess) {
          onSuccess();
        }
      },
      err => console.error('getUserMedia failed', err)
    );
  }

  private assignClientHandlers(): void {
    this.client.on(ClientEvent.LocalStreamPublished, evt => {
      console.log('Publish local stream successfully');
    });

    this.client.on(ClientEvent.Error, error => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
          '',
          () => console.log('Renewed the channel key successfully.'),
          renewError => console.error('Renew channel key failed: ', renewError)
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream as Stream;
      this.client.subscribe(stream, { audio: true, video: true }, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      if (!this.remoteCalls.length) {
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.PeerLeave, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }

  closePage() {
    this.nav.back();
  }

  leave() {
    this.client.leave(() => {
      console.log("Leavel channel successfully");
    }, (err) => {
      console.log("Leave channel failed");
    });
    this.router.navigate(['/citas-pendientes']);
    this.localStream.close();
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
