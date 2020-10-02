import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-recalcdate',
  templateUrl: './recalcdate.component.html',
  styleUrls: ['./recalcdate.component.scss'],
})
export class RecalcdateComponent implements OnInit {
  public diaElegido;

  constructor(public router: Router,
              public modalCtrl: ModalController,
              public nav: NavController) { }

  ngOnInit() {}

  goToRecalc(matInput){
    let date = moment(matInput).format('YYYY-MM-DD');
    console.log(date);
    localStorage.setItem('startPregnancy', date);
    /*console.log('dia elegido', this.diaElegido);
    console.log('resultado de input', matInput); */
    if(date){
      this.router.navigate(['/tabs/tab1']);
  }
  this.modalCtrl.dismiss({
    'dismissed': true
  });
  }

}
