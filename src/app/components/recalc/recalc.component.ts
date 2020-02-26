import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recalc',
  templateUrl: './recalc.component.html',
  styleUrls: ['./recalc.component.scss'],
})
export class RecalcComponent implements OnInit {
  @Input ('name')  name; 
  public fechaMax;
  public fechaMin;
  public deshabilitado = false;

  constructor(public popoverCtrl: PopoverController,
              public router: Router) { }

  ngOnInit() {
    console.log('nombre',this.name);
    this.fechaMin = moment().subtract(9, 'months').format('YYYY-MM-DD');
    this.fechaMax = moment().format('YYYY-MM-DD');
    console.log(this.fechaMax);
  }

  saveDate(fechaManual){
    if(this.name){
      localStorage.setItem('name', this.name);
    }else{
    }
    localStorage.setItem('startPregnancy', fechaManual.value);
    this.popoverCtrl.dismiss()
    this.router.navigate(['tabs']);
    
    console.log( 'fechaManual', fechaManual.value);
  }
  
  infoLista(event){
    console.log(event);
    this.deshabilitado = true;
  }

}
