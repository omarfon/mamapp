import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-infonopago',
  templateUrl: './infonopago.component.html',
  styleUrls: ['./infonopago.component.scss'],
})
export class InfonopagoComponent implements OnInit {

  constructor(public popover : PopoverController) { }

  ngOnInit() {}

  back(){
    this.popover.dismiss();
  }
}
