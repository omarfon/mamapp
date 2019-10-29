import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../service/recipes.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
/* import {siwtchMap} from 'rxjs/operators'; */

@Component({
  selector: 'app-detailcontrol',
  templateUrl: './detailcontrol.page.html',
  styleUrls: ['./detailcontrol.page.scss'],
})
export class DetailcontrolPage implements OnInit {

  public fromDate;
  public toDate;

  public dataControl;
  public parametros : any = [];
  public encuentros : any = [];
  public datos = false;
  public recipes;
  public control;
  public dias;
  public recipe;
  public inicioPrescripcion;
  public recetas;

  public encuentro;
  public notas;
  public _encuentro;

  constructor( public recipeSrv: RecipesService,
               public route: ActivatedRoute,
               public routes: Router) { }

  ngOnInit() {
    this.control = 'parametros'; 
    let encuentroObj = this.route.snapshot.paramMap.get('encuentroObj');
    this.encuentro = JSON.parse(encuentroObj);
    /* console.log('this.encuentro en detalle control:', this.encuentro); */
  

    console.log(this.encuentro);
    if(!this.encuentro.notas[0]){
        this.notas = "no hay notas del doctor en este momento"
    }else{
      this.notas = this.encuentro.notas[0].valor_campo;
      this.parametros = this.encuentro.parametros;
      /* console.log(this.parametros); */
    }


    
    
    let id = this.encuentro.encuentro;

    this.recipeSrv.getRecipes(id).subscribe((data:any)=>{
      this.recipes = data;
      console.log(this.recipes);
      if(!this.recipes[0]){
          console.log('no hay recetas para este control');
      }else{
          this.recetas = this.recipes[0].prescripciones;
      }
          this.inicioPrescripcion = this.recipes.inicio_prescripcion;
          
          for(let i = 0; i< this.recipes.length; i++){
            let dias = moment(this.recipes.fin_prescripcion).diff(this.recipes.inicio_prescripcion, 'days');
            this.recipes[i].dias = dias
          }
    })
  }

  goToCita(c){
    this.routes.navigate(['citas',{
      c:c
    }])
  }

  goToDetailRecipe(){

  }
}
