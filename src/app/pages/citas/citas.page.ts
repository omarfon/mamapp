import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras, ActivatedRouteSnapshot } from '@angular/router';
import { CitasService } from './../../service/citas.service';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import moment from 'moment';
import { FinancerdatesService } from '../../service/financerdates.service';
import { forkJoin, Observable } from 'rxjs';
import { API_IMAGES } from '../../../environments/environment';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {
  c: any;
  servicios: any;
  disponibles: boolean;
  doctors: any;
  doctorsF: any;
  id: any;
  fromDate: any;
  toDate: any;
  horas: any;
  dia: any;
  dias: any;
  selectedDay: any;
  hora: any;

  public available;
  public complete: boolean = false;


  itemExpanded: boolean = true;
  itemExpandHeight: number = 220;
  changueColor: Boolean = false;
  public apiEndpoint;
  consultaExterna: any;
  teleconsulta: any;
  escogido: number;
  public panelOpenState: boolean;
  public boxID: any;
  public boxCaID: any;

  constructor(public routes: Router,
    public route: ActivatedRoute,
    public citasSrv: CitasService,
    public loadingCtrl: LoadingController,
    public nav: NavController,
    public finanSrv: FinancerdatesService) {
    this.panelOpenState = false;
  }

  async ngOnInit() {
    /* this.datos = this.route.snapshot.paramMap.get('datos');  */


    this.apiEndpoint = API_IMAGES;
    const data = this.route.snapshot.paramMap.get('data');
    this.c = JSON.parse(data)
    console.log('c:', this.c);
    this.escogido = this.c.escogido;
    console.log(this.escogido);
    this.id = 38;
    this.fromDate = moment().format('YYYY-MM-DD');
    this.toDate = moment(this.fromDate).add(5, 'days').format('YYYY-MM-DD');

    this.getDoctors();
  }

  ionViewWillEnter() {
    this.getDoctors();
  }

  async getDoctors() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando doctores...'
    });
    await loading.present();
    /*  this.citasSrv.getServicios().subscribe( servicios =>{
     this.servicios = servicios;
   });
    */

    this.citasSrv.getDoctorsPerId(this.id).subscribe(doctors => {
      this.disponibles = false;
      if (doctors.length == 0) {
        this.disponibles = true;
        return null;
      }
      console.log(doctors);
      this.doctors = doctors;
      for (let doctor of doctors) {
        this.citasSrv.getAvailablesPerDoctor(doctor.id, this.escogido, doctor.service.id, this.fromDate, this.toDate).subscribe((availables: any) => {
          if (availables && availables.length > 0) {
            doctor.availables = availables;
            doctor.isAvailable = true;
            doctor.expanded = false;
          }
        })
      }
      this.doctorsF = this.doctors;
      console.log(this.doctorsF);
      loading.dismiss();
      console.log('cerrando el loading')
      /*     if(this.doctors = doctors.length){
          } */
      /* console.log('this.doctors:', this.doctors); */
    }, err => {
      console.log('err', err)
    },
      () => {
        console.log('llamada finalizada')
      });


  }

  expandedItem(doctor, available) {
    if (!this.hora) {
      console.log('doctor y available:', doctor, available);
      this.selectedDay = available;
      let id = doctor.id;
      let serviceId = doctor.service.id;
      let fromDate = this.selectedDay.date;
      let toDate = this.selectedDay.date;
      this.citasSrv.getAvailablesPerDoctor(id, this.escogido, serviceId, fromDate, toDate).subscribe(hoy => {
        console.log('hoy', hoy);
        const dates = hoy[0].hours;
        if (this.escogido === 44) {
          this.consultaExterna = dates.filter(x => x.params.provisionId[0] === 44);
          this.dias = this.consultaExterna
          console.log('this.consultaExterna:', this.consultaExterna);
        } else {
          this.teleconsulta = dates.filter(x => x.params.provisionId[0] === 845337);
          this.dias = this.teleconsulta
          console.log('this.teleconsulta:', this.teleconsulta);
        }
        // console.log('this.dias:',this.dias);
        this.doctors.map((listDoctor) => {
          if (doctor == listDoctor) {
            listDoctor.expanded = true;
          } else {
            listDoctor.expanded = false;
          }
          return listDoctor
        });
        this.horas = this.dias;
        /* console.log('las horas:', this.horas); */
        this.dia = available.date;
        // console.log('dias', this.dias);
      })
    } else {
      console.log('doctor:', doctor, available);
      this.selectedDay = available;
      let id = doctor.id;
      let serviceId = doctor.service.id;
      let fromDate = this.selectedDay.date;
      let toDate = this.selectedDay.date;
      this.citasSrv.getAvailablesPerDoctor(id, this.escogido, serviceId, fromDate, toDate).subscribe(hoy => {
        /* console.log('hoy' , hoy); */
        this.dias = hoy[0].hours;
        // console.log('this.dias:',this.dias);
        this.doctors.map((listDoctor) => {
          if (doctor == listDoctor) {
            listDoctor.expanded = true;
          } else {
            listDoctor.expanded = false;
          }
          return listDoctor
        });
        this.horas = this.dias;
        // console.log('las horas:', this.horas);
        this.dia = available.date;
        // console.log('dias', this.dias);
      })
    }
  }

  stateShow(item: any, index, items) {
    console.log(item, index, items);
    this.boxID = item;
    this.boxCaID = index;
    this.selectedDay = items;
  }

  errorHandler(event) {
    event.target.src = "https://1.bp.blogspot.com/-p8EFlkXywyE/UDZvWTyr1bI/AAAAAAAAEU0/xL8pmKN1KOY/s1600/facebook.png"
  }

  goToFinancer(doctor, hora) {
    /* console.log('hora y doctor', hora, doctor); */
    const datos = {
      centerId: hora.params.centerId,
      servicio_id: hora.params.serviceId,
      prestacion: hora.params.provisionId,
      medico_id: doctor.id,
      proposedate: this.selectedDay.date,
      hora: hora,
      encuentro: this.escogido,
      doctor: {
        id: doctor.id,
        fullname: doctor.fullName,
        info: doctor.info,
        service: doctor.service,
        cmp: doctor.cmp
      }
    }
    const user = localStorage.getItem('role')
    const datosObj = JSON.stringify(datos);
    /* console.log('data armada', datosObj); */
    if (user === 'public') {
      this.routes.navigate(['/register', datosObj])
    } else {
      this.routes.navigate(['financer', datosObj]);
    }
  }


}
