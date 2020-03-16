import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recalcdate',
  templateUrl: './recalcdate.component.html',
  styleUrls: ['./recalcdate.component.scss'],
})
export class RecalcdateComponent implements OnInit {
  public diaElegido;

  constructor(public router: Router,
              public modalCtrl: ModalController) { }

  ngOnInit() {}

  goToRecalc(matInput){
    let date = moment(matInput).format('YYYY-MM-DD');
/*     console.log(date);
    console.log('dia elegido', this.diaElegido);
    console.log('resultado de input', matInput); */
    if(date){
      this.router.navigate(['/home',{
        date:date
      }
    ]);
  }
  this.modalCtrl.dismiss({
    'dismissed': true
  });
  }

}
