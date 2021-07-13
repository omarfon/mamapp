import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CitasPediatricPage } from './citas-pediatric.page';

const routes: Routes = [
  {
    path: '',
    component: CitasPediatricPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CitasPediatricPage]
})
export class CitasPediatricPageModule {}
