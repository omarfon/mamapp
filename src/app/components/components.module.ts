import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FechaPregnancyComponent } from './fecha-pregnancy/fecha-pregnancy.component';
import { ModalCodeComponent } from './modal-code/modal-code.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FiterComponent } from './fiter/fiter.component';
import { InfonopagoComponent } from './infonopago/infonopago.component';
import { CalcComponent } from './calc/calc.component';
import { ExpandableComponent } from './expandable/expandable.component';
import { BabyComponent } from './baby/baby.component';
import { DetalleControlComponent } from './detalle-control/detalle-control.component';
import { RecalcComponent } from './recalc/recalc.component';
import {MatDatepickerModule} from '@angular/material';
import { FaceRegisterComponent } from './face-register/face-register.component';
import { NextControlsComponent } from './next-controls/next-controls.component';




@NgModule({
  declarations: [FechaPregnancyComponent, 
                 ModalCodeComponent,
                FiterComponent,
                InfonopagoComponent,
                CalcComponent,
                ExpandableComponent,
                BabyComponent,
                DetalleControlComponent,
                RecalcComponent,
                FaceRegisterComponent,
                NextControlsComponent
                 ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule
  ],
  exports:[
    FechaPregnancyComponent,
    ModalCodeComponent,
    FiterComponent,
    InfonopagoComponent,
    CalcComponent,
    ExpandableComponent,
    BabyComponent,
    DetalleControlComponent,
    RecalcComponent,
    FaceRegisterComponent,
    NextControlsComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ComponentsModule { }
