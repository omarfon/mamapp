import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { AuthoService } from 'src/app/service/autho.service';
import moment from "moment";
import { Router } from '@angular/router';
import { AlertController, Events, ModalController, PopoverController } from '@ionic/angular';
import { CalcComponent } from 'src/app/components/calc/calc.component';

@Component({
  selector: 'app-face-register',
  templateUrl: './face-register.component.html',
  styleUrls: ['./face-register.component.scss'],
})
export class FaceRegisterComponent implements OnInit {
  @Input('datos') datos;
  public registerForm: FormGroup;

  public name;
  public genders;
  public documents;
  public _documenType;


  public datosPersonales: any;
  public nombreTemplate = "Nombres :";
  public apellidoPTemplate = "Apellido Paterno :";
  public apellidoMTemplate = "Apellido Materno :";
  public emailTemplate = "Email :";
  public fechaTemplate = "Fecha de nacimiento :";
  public telefonoTemplate = "Telefono :";
  public tipoDocTemplate = "DNI :";
  public ndocTemplate = "Nº de documento :";
  aprobed: boolean = false;

  public gender = {
    id: 3,
    name: "MUJER"
  };

  public _gender;

  public document = {
    id: 1,
    name: "DNI"
  };

  constructor(public fb: FormBuilder,
    public dataSvr: DataService,
    public authoSrv: AuthoService,
    public router: Router,
    public alertCtrl: AlertController,
    public events: Events,
    public modalCtrl: ModalController,
    public popover: PopoverController) {

    this.dataSvr.getGenders().subscribe(datagenders => {
      this.genders = datagenders;
      console.log("this.genders:", this.genders);
    });

    this.dataSvr.getDocuments().subscribe(documents => {
      this.documents = documents;
      console.log("this.genders:", this.documents);
    });
  }

  ngOnInit() {
    console.log('data que viene de login', this.datos);

    this.registerForm = this.fb.group({
      name: [this.nombreTemplate, [Validators.required]],
      surname1: ['', [Validators.required]],
      surname2: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]],
      aprobed: ['', [Validators.required]]
    });

    console.log('datos del login', this.datos);

    if (this.datos) {
      let nacimiento = this.datos.additionalUserInfo.profile.birthday
      console.log('datos personales', this.datos);
      this.nombreTemplate = this.datos.additionalUserInfo.profile.first_name;
      this.apellidoPTemplate = this.datos.additionalUserInfo.profile.last_name;
      this.apellidoMTemplate = this.datos.apellidoMaterno;
      this.emailTemplate = this.datos.additionalUserInfo.profile.email;
      this.fechaTemplate = this.datos.additionalUserInfo.profile.birthday;
      this.tipoDocTemplate = this.datos.tipodoc;
      this.ndocTemplate = this.datos.numdoc;

      console.log('this.nombreTemplate:', this.nombreTemplate);
    }
  }

  validacion() {
    const valid = this.registerForm.value;
    if (valid.aprobed == true) {
      return true;
    } else {
      return false;
    }
  }

  cambioDocumento($event) {
    this._documenType = this.document;
    /*  console.log('this.document', this._documenType); */
  }

  aceptaCondiciones(aprobed) {
    /* console.log('aprobed', aprobed); */
    this.aprobed = true;
  }

  registerMiddleware() {
    let data = {
      email: this.emailTemplate,
      name: this.nombreTemplate,
      surname1: this.apellidoPTemplate,
      surname2: this.apellidoMTemplate,
      birthdate: moment(this.fechaTemplate).format('YYYY-MM-DD'),
      gender: this.gender,
      documentType: this.document,
      documentNumber: this.ndocTemplate,
      phone: this.telefonoTemplate
    }

    this.authoSrv.registerWithFacebook(data).subscribe((data: any) => {
      if (data) {
        console.log('data despues de login facebook', data);
        localStorage.setItem('idTokenUser', data.patientId);
        localStorage.setItem('emailUser', data.userEmail);
        //aqui debería venirme el authorization para poder cargarlo y hacer login de una sola vez!!!
        localStorage.setItem('authorization', data.authorization);
        localStorage.setItem('token', data.firebaseToken);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.name);
        localStorage.setItem('id', data.patientId);
        this.events.publish('user:logged', 'logged');
        localStorage.setItem('uid', data.userId);
        localStorage.setItem('photoUrl', data.photoUrl);
        localStorage.setItem('sigIn', 'completo');
        this.modalCtrl.dismiss({
          'dismissed': true
        });
      }
      /* this.router.navigate(['/tabs']); */
      this.goToCalc(data.name);

    }, async err => {
      console.log(err)
      /* let alert = await this.alertCtrl.create({
        header:"Error en el registro",
        subHeader:`${err.err.message}`,
        buttons:[
          {
            text:"reintentar"
          }
        ]
      });
      await alert.present(); */
    });

  }

  async goToCalc(nombre) {
    const popover = await this.popover.create({
      component: CalcComponent,
      componentProps: {
        nombre: nombre
      },
      backdropDismiss: false,
      cssClass: 'popoverStyle'
    })
    await popover.present();
    /* this.router.navigate(['tabs']); */
  }

}
