import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import * as moment from 'moment';


@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss'],
})
export class CalcComponent implements OnInit {

  @Input ('nombre')  nombre; 
  public fechaMax;
  public fechaMin;
  public deshabilitado = false;

  constructor(public router: Router, public popoverCtrl: PopoverController) { }

  ngOnInit() {
    console.log('nombre',this.nombre);
    this.fechaMin = moment().subtract(9, 'months').format('YYYY-MM-DD');
    this.fechaMax = moment().format('YYYY-MM-DD');
    console.log(this.fechaMax);
  }

  saveDate(fechaManual){
    localStorage.setItem('name', this.nombre);
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
