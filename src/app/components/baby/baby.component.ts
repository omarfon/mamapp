import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';



@Component({
  selector: 'app-baby',
  templateUrl: './baby.component.html',
  styleUrls: ['./baby.component.scss'],
})
export class BabyComponent implements OnInit {

  public semanas = 12;
  constructor(public router: Router,
              public popover: PopoverController) { }

  ngOnInit() {}

  close(){
    this.popover.dismiss();
  }

}
