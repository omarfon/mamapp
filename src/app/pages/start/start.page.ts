import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  @ViewChild('slides', {static:true}) slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slideShadows: true,
    startAutoplay: true
  };

  constructor(public router: Router) { }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

  goToLogin(){
    /* this.navCtrl.push(LoginPage); */
    this.router.navigate(['login']);
  }

  goToRegister(){
    /* this.navCtrl.push(RegisterPage); */
    this.router.navigate(['register']);
  }
  nextSlide() {
    this.slides.slideNext();
  }
  slidePrev(){
    this.slides.slidePrev();
  }

}
