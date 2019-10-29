import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RegisterPage } from './register.page';
import { ComponentsModule } from '../../components/components.module';
import { ModalCodeComponent } from '../../components/modal-code/modal-code.component';



const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
  entryComponents:[
    ModalCodeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
