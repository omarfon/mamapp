import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-control',
  templateUrl: './detalle-control.component.html',
  styleUrls: ['./detalle-control.component.scss'],
})
export class DetalleControlComponent implements OnInit {

  public name ;

  constructor() { }

  ngOnInit() {
      this.name = localStorage.getItem('name');
  }

}
