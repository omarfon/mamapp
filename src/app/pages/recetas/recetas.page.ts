import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../service/recipes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage implements OnInit {

    public recipes;
    public _recipes;

  constructor(public recipeSrv: RecipesService,
              public router: Router) { }

  ngOnInit() {
    this.recipeSrv.getAllRecipes().subscribe(data =>{
      this.recipes = data;
     /*  console.log(this.recipes); */
    });
  }

  goToDetailRecipe(recipe){
    const datosObj = JSON.stringify(recipe);

   this.router.navigate(['detailrecipe',datosObj])
  }

}
