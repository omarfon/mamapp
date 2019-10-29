import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fiter',
  templateUrl: './fiter.component.html',
  styleUrls: ['./fiter.component.scss'],
})
export class FiterComponent implements OnInit {

  constructor(public routes: Router,  public popover : PopoverController) { }

  ngOnInit() {}

  goToHomePastilla(){
    console.log('pastilla');
    this.popover.dismiss();
    
  }

  goToHomeComparativa(){
      console.log('comparativa');
      this.popover.dismiss();
  }

  goToHomeDesarrollo(){
    console.log('evobebe');
    this.popover.dismiss();
}

  goToHomeCambios(){
    console.log('cambio');
    this.popover.dismiss();
  }

  goToHomeNutricion(){
    console.log('nutricion');
    this.popover.dismiss();
  }

  goToHomeSemana(){
    console.log('nota 3');
    this.popover.dismiss();
  }

  selectedDay(dia){
 
    console.log('selectedDay');
    this.popover.dismiss();
  }

  getAll(){
    console.log('todo');
    this.popover.dismiss();
  }

}
