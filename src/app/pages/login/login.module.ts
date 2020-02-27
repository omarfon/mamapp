import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { ComponentsModule } from '../../components/components.module';
import { FechaPregnancyComponent } from '../../components/fecha-pregnancy/fecha-pregnancy.component';
import { CalcComponent } from 'src/app/components/calc/calc.component';
import { FaceRegisterComponent } from 'src/app/components/face-register/face-register.component';
/* import { FacebookRegisterPage } from '../facebook-register/facebook-register.page'; */



const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  entryComponents:[
    FechaPregnancyComponent,
    CalcComponent,
    FaceRegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  exports:[FechaPregnancyComponent, CalcComponent, FaceRegisterComponent],
  declarations: [LoginPage]
})
export class LoginPageModule {}
