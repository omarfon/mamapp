import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { MaterialModule } from '../../material.module';

import { FechaPregnancyComponent } from '../../components/fecha-pregnancy/fecha-pregnancy.component';
import { ComponentsModule } from '../../components/components.module';
import { FiterComponent } from '../../components/fiter/fiter.component';
import { ExpandableComponent } from 'src/app/components/expandable/expandable.component';
import { BabyComponent } from 'src/app/components/baby/baby.component';
import { CalcComponent } from 'src/app/components/calc/calc.component';
import { RecalcComponent } from 'src/app/components/recalc/recalc.component';
import { NextControlsComponent } from 'src/app/components/next-controls/next-controls.component';







const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  entryComponents:[
    FechaPregnancyComponent,
    FiterComponent,
    ExpandableComponent,
    BabyComponent,
    CalcComponent,
    RecalcComponent,
    NextControlsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
