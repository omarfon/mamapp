import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailrecipe',
  templateUrl: './detailrecipe.page.html',
  styleUrls: ['./detailrecipe.page.scss'],
})
export class DetailrecipePage implements OnInit {
  data: string;
  datosObj: any;
  recetas: any;
  date: any;
  

  constructor( public routes: Router,
               public router: ActivatedRoute) { }

  ngOnInit() {
    this.data = this.router.snapshot.paramMap.get('datosObj');
    this.datosObj = JSON.parse(this.data);
    this.recetas = this.datosObj.prescripciones;
    this.date = this.datosObj.prescripciones[0]
    console.log(this.datosObj);
  }

}
