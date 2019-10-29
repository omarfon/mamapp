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
    ExpandableComponent
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
