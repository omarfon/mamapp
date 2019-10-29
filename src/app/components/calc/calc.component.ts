import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss'],
})
export class CalcComponent implements OnInit {

  @Input ('nombre')  nombre; 

  constructor(public router: Router, public popoverCtrl: PopoverController) { }

  ngOnInit() {
    console.log('nombre',this.nombre);
  }

  saveDate(nombre, fechaManual){
    localStorage.setItem('patientName', nombre.value);
    localStorage.setItem('startPregnancy', fechaManual.value);
    this.popoverCtrl.dismiss()
    this.router.navigate(['tabs']);
    
    console.log( fechaManual, fechaManual.value);
  }

}
