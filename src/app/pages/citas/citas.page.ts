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
  public id: number = 38;
  public fromDate: string = moment().format('YYYY-MM-DD');
  public toDate: string = moment(this.fromDate).add(5, 'days').format('YYYY-MM-DD');
  horas: any;
  dia: any;
  dias: any;
  selectedDay: any;
  hora: any;

  public color: any = 'warn';
  public mode: any = 'indeterminate';

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
  public manyBoxes;
  public datesCalendar: any;

  public hours;
  public chargeHours = false;

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
    this.getDoctorWDates();
  }

 /*  ionViewWillEnter() {
    this.getDoctorWDates();
  } */

  async getDoctorWDates(){
    this.doctorsF = [];
    const loading = await this.loadingCtrl.create({
      message:"buscando especialistas"
    });
    await loading.present();
    this.citasSrv.getDoctorsSpecialtyBD(this.id).subscribe((data:any) => {
      console.log('data recibida de nuevo endpoint:',data);
      this.doctorsF = data;
      loading.dismiss();
      console.log('todos los especialistas:',this.doctorsF);

    }); 
  }

  async getDoctors(){
    this.doctorsF = [];
    const loading = await this.loadingCtrl.create({
      message:"buscando especialistas"
    });
    await loading.present();
    console.log(this.id, this.toDate, this.fromDate);
    this.citasSrv.getDoctorsSpecialty(this.id,this.fromDate, this.toDate).subscribe((doctors:any) => {
      const docts = doctors.centers[0].services[0].professionals.filter((element) => {
        return element.availables.length > 0;
      })
      this.manyBoxes = docts.length;
      docts.forEach(element => {
        const fech = element.availables;
        this.datesCalendar = fech;
      });
      this.doctorsF = docts;
      loading.dismiss();
    })
    console.log(this.doctorsF);
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
          this.dias = this.consultaExterna
          console.log('this.consultaExterna:', this.consultaExterna);
        this.doctors.map((listDoctor) => {
          if (doctor == listDoctor) {
            listDoctor.expanded = true;
          } else {
            listDoctor.expanded = false;
          }
          return listDoctor
        });
        this.horas = this.dias;
        this.dia = available.date;
      })
    } else {
      console.log('doctor:', doctor, available);
      this.selectedDay = available;
      let id = doctor.id;
      let serviceId = doctor.service.id;
      let fromDate = this.selectedDay.date;
      let toDate = this.selectedDay.date;
      this.citasSrv.getAvailablesPerDoctor(id, this.escogido, serviceId, fromDate, toDate).subscribe(hoy => {
        this.dias = hoy[0].hours;
        this.doctors.map((listDoctor) => {
          if (doctor == listDoctor) {
            listDoctor.expanded = true;
          } else {
            listDoctor.expanded = false;
          }
          return listDoctor
        });
        this.horas = this.dias;
        this.dia = available.date;
      })
    }
  }

  stateShow(item: any, index, items) {
    console.log(item, index, items);
    this.hora = items;
    this.hours = [];
    this.chargeHours = true;
    this.boxID = item;
    this.boxCaID = index;
    this.selectedDay = items;
    const dataDate = items;
    console.log('llamado de horas para el dia', item, index, items);
    let data = {
      fromDateString: items.fecha + 'T00:00:00.000',
      toDateString: items.fecha + 'T00:00:00.000',
      centerId: items.cod_centro,
      basicServiceId: items.serv_bas_pk,
      professionalId: items.codigo_personal,
      provisions : [
        items.prest_item_pk
      ]
    } 
    this.citasSrv.getDoctorsSlotsPerDay(data).subscribe((resp:any) => {
      this.hours = resp[0].appointmentDateTimes;
        console.log('horas solicitadas:',resp, this.hours);
      this.chargeHours = false;
    })
  }

  errorHandler(event) {
    event.target.src = "https://1.bp.blogspot.com/-p8EFlkXywyE/UDZvWTyr1bI/AAAAAAAAEU0/xL8pmKN1KOY/s1600/facebook.png"
  }

  goToFinancer(doctor, hora) {
    console.log(doctor, hora, this.hora)
    const datos = {
      centerId: hora.params.centerId,
      servicio_id: hora.params.serviceId,
      prestacion: hora.params.provisionId,
      medico_id: doctor.id,
      proposedate: this.selectedDay.date,
      hora: this.hora,
      encuentro: this.escogido,
      doctor: {
        id: doctor.id,
        fullname: doctor.fullName,
        info: doctor.info,
        service: doctor.service,
        cmp: doctor.cmp
      }
    }
    this.citasSrv.datosCita = hora;
    const user = localStorage.getItem('role')
    const datosObj = JSON.stringify(datos);
      this.routes.navigate(['financer']);
  }


}
