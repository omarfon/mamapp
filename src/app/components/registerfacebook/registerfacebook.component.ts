import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registerfacebook',
  templateUrl: './registerfacebook.component.html',
  styleUrls: ['./registerfacebook.component.scss'],
})
export class RegisterfacebookComponent implements OnInit {

  @Input ('data')  data; 
  public registerForm: FormGroup;

  public datosPersonales:any;
  public nombreTemplate = "Nombres :";
  public apellidoPTemplate = "Apellido Paterno :";
  public apellidoMTemplate = "Apellido Materno :";
  public emailTemplate = "Email :";
  public fechaTemplate = "Fecha de nacimiento :";
  public telefonoTemplate = "Telefono :";
  public tipoDocTemplate = "DNI :";
  public ndocTemplate = "Nº de documento :"; 

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    console.log('data que viene de login', this.data);

    this.registerForm = this.fb.group({
      name: ['',  [ Validators.required ]],
      surname1: ['',  [ Validators.required ]],
      surname2: ['',  [ Validators.required ]],
      /* gender: ['',  [ Validators.required ]], */
      birthdate: ['',  [ Validators.required ]],
      documentType: ['',  [ Validators.required ]],
      documentNumber: ['',  [ Validators.required]],
      phone: ['',  [ Validators.required, Validators.minLength(9), Validators.maxLength(9) ]],
      email: ['',  [ Validators.required, Validators.email ]],
      password: ['',  [ Validators.required, Validators.minLength(8) ]],
      password_confirmation: ['',  [ Validators.required, Validators.minLength(8)]],
      aprobed: ['', [ Validators.required]]
    });

    
    if(this.data){
      console.log('datos personales',this.datosPersonales);
      this.nombreTemplate = this.data.first_name;
      this.apellidoPTemplate = this.data.last_name;
      this.apellidoMTemplate = this.data.apellidoMaterno;
      this.emailTemplate = this.data.email;
      this.fechaTemplate = this.data.birthday;
      this.telefonoTemplate = this.data.telefono;
      this.tipoDocTemplate = this.data.tipodoc;
      this.ndocTemplate = this.data.numdoc;
      console.log('this.nombreTemplate:',this.nombreTemplate);
    }
  }





}