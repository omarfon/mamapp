import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ControlesPage } from './controles.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { DetalleControlComponent } from 'src/app/components/detalle-control/detalle-control.component';


const routes: Routes = [
  {
    path: '',
    component: ControlesPage
  }
];

@NgModule({
  entryComponents:[
    DetalleControlComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ControlesPage]
})
export class ControlesPageModule {}
