import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FechaPregnancyComponent } from './fecha-pregnancy/fecha-pregnancy.component';
import { ModalCodeComponent } from './modal-code/modal-code.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FiterComponent } from './fiter/fiter.component';
import { InfonopagoComponent } from './infonopago/infonopago.component';
import { CalcComponent } from './calc/calc.component';
import { ExpandableComponent } from './expandable/expandable.component';


@NgModule({
  declarations: [FechaPregnancyComponent, 
                 ModalCodeComponent,
                FiterComponent,
                InfonopagoComponent,
                CalcComponent,
                ExpandableComponent
                 ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports:[
    FechaPregnancyComponent,
    ModalCodeComponent,
    FiterComponent,
    InfonopagoComponent,
    CalcComponent,
    ExpandableComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ComponentsModule { }
