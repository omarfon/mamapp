import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-facebook-register',
  templateUrl: './facebook-register.page.html',
  styleUrls: ['./facebook-register.page.scss'],
})
export class FacebookRegisterPage implements OnInit {

  @Input ('datos') datos;
  public registerForm: FormGroup;

  public name;

  public datosPersonales:any;
  public nombreTemplate = "Nombres :";
  public apellidoPTemplate = "Apellido Paterno :";
  public apellidoMTemplate = "Apellido Materno :";
  public emailTemplate = "Email :";
  public fechaTemplate = "Fecha de nacimiento :";
  public telefonoTemplate = "Telefono :";
  public tipoDocTemplate = "DNI :";
  public ndocTemplate = "Nº de documento :";

  constructor(public fb: FormBuilder) {}
  
  ngOnInit() {
    console.log('data que viene de login', this.datos);
  
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
    console.log('datos del login', this.datos);
  }

}
