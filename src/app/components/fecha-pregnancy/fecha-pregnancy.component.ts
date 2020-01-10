import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-fecha-pregnancy',
  templateUrl: './fecha-pregnancy.component.html',
  styleUrls: ['./fecha-pregnancy.component.scss'],
})
export class FechaPregnancyComponent implements OnInit {
  fechaMin: string;
  fechaMax: string;
  public deshabilitado = false;
  
  constructor(public router: Router, public popoverCtrl: PopoverController) { }

  ngOnInit() {
    /* console.log('nombre',this.nombre); */
    this.fechaMin = moment().subtract(9, 'months').format('YYYY-MM-DD');
    this.fechaMax = moment().format('YYYY-MM-DD');
    console.log(this.fechaMax);
  }

  saveDate(nombre, fechaManual){
    /* localStorage.setItem('name', nombre.value); */
    localStorage.setItem('startPregnancy', fechaManual.value);
    this.popoverCtrl.dismiss()
    this.router.navigate(['tabs']);
    
    console.log( fechaManual, fechaManual.value);
  }

  /* validate(){
    if(nombre != "" && fechaManual != ""){
      return true
    }else{
      return false
    }

  } */

  infoLista(event, nombre){
    console.log(event);
    if(!nombre && event){
      this.deshabilitado = false;
    }else{
      this.deshabilitado = true;
    }
  }

}
