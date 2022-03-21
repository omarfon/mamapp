import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotasService } from '../../service/notas.service';
import moment from 'moment';
import { DatosControlService } from '../../service/datos-control.service';
import { PopoverController, AlertController, ModalController, LoadingController, Platform, NavParams } from '@ionic/angular';
import { FiterComponent } from '../../components/fiter/fiter.component';
import { EstadoService } from 'src/app/service/estado.service';
import { ChatService } from 'src/app/service/chat.service';
import { BabyComponent } from 'src/app/components/baby/baby.component';
import * as _ from 'lodash';
import { FechaPregnancyComponent } from 'src/app/components/fecha-pregnancy/fecha-pregnancy.component';
import { CalcComponent } from 'src/app/components/calc/calc.component';
import { RecalcComponent } from 'src/app/components/recalc/recalc.component';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { NextControlsComponent } from 'src/app/components/next-controls/next-controls.component';
import { RecalcdateComponent } from 'src/app/components/recalcdate/recalcdate.component';
import { AppointmentService } from 'src/app/service/appointment.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  /* private number = Constants.COACH; */
  public cantidad: 0;
  public _cantidad: any;
  public startPregnancy;
  public start;
  public fecha;
  public semanas;
  public totalSemanas;
  public totalDias;
  public total;
  public totaldias;
  mostrar = false;
  today;
  params;
  public notas;
  public _notas;
  public filtro;
  public notasMuestreo;
  public notasFiltro;
  public dia;
  public nombre;
  public fechaPosible;
  public posible;
  public diasPendientes;
  public diasFaltantes;
  public dataUser: [];
  public actualMomento;
  public name;
  public dataTrans;
  public slideOpts = {
    slidesPerView: 1.3

  }
  public imagePerfil;
  @Input('data') data;
  public numberControl = 5;
  public dias = '3';
  public date;
  dates: any;
  public horaProgramada: boolean;
  public horaAlarma;

  constructor(public router: Router,
    public notasServ: NotasService,
    public datosPvr: DatosControlService,
    public popover: PopoverController,
    public estado: EstadoService,
    public alert: AlertController,
    public modalCtrl: ModalController,
    public chat: ChatService,
    public loadinCtrl: LoadingController,
    public localNoti: LocalNotifications,
    public plt: Platform,
    public appointmenSrv: AppointmentService,
    private activateRoute: ActivatedRoute) {

    this.plt.ready().then(() => {
      this.localNoti.on('click').subscribe(res => {
        console.log('click:', res);
        let msg = res.data ? res.data.mydata : "";
        this.showAlert(res.title, res.text, msg)
      });
      this.localNoti.on('trigger').subscribe(res => {
        console.log('trigger:', res);
        let msg = res.data ? res.data.mydata : "";
        this.showAlert(res.title, res.text, msg)
      });
    });
    this.activateRoute.params.subscribe((date) => {
      console.log('params', date);
      this.date = date;
      console.log(this.date);
    })
    this.updateSession();
  }

  scheduleNotification() {
    this.localNoti.schedule({
      id: 1,
      title: "Recordatorio",
      text: 'Toma tu ácido fólico',
      data: { mydata: 'Data Oculta' },
      sound: 'file://sound.mp3',
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true,
      icon: 'https://www.aviva.pe/assets/svg/logo.svg',
      vibrate: true
    });
  }

  recurringNotification() {
    this.localNoti.schedule({
      id: 22,
      title: "Recordatorio de medicamento",
      text: 'Recuerda tomar, hoy tu ácido fólico',
      data: { mydata: 'Data Oculta' },
      trigger: { every: { hour: 16, minute: 35 } },
      vibrate: true
      /* foreground: true */
    });
  }

  repeatDaily() {
    const horaDiaria = parseInt(localStorage.getItem('horaAlerta'));
    this.localNoti.schedule({
      id: 42,
      title: "Es hora del Ácido fólico",
      text: 'Recuerda tomar tu ácido fólico',
      data: { mydata: 'Data Oculta' },
      trigger: { every: { hour: horaDiaria, minute: 0 } },
      vibrate: true,
      foreground: true,
      icon: 'https://www.aviva.pe/assets/svg/logo.svg',
    });
  }

  async defineHourAlert() {
    let alert = await this.alert.create({
      header: 'Programa tus alertas',
      message: 'ingresa la hora en la que se notificará diariamente',
      inputs: [
        {
          name: '8:00 am',
          type: 'checkbox',
          value: '08',
          label: '8:00 am'
        },
        {
          name: '9:00 am',
          type: 'checkbox',
          value: '09',
          label: '9:00 am'
        },
        {
          name: '10:00 am',
          type: 'checkbox',
          value: '10',
          label: '10:00 am'
        },
        {
          name: '11:00 am',
          type: 'checkbox',
          value: '11',
          label: '11:00 am'
        },
        {
          name: '12:00 am',
          type: 'checkbox',
          value: '12',
          label: '12:00 m'
        },
        {
          name: '11:00 pm',
          type: 'checkbox',
          value: '13',
          label: '01:00 pm'
        }
      ],
      buttons: [
        {
          text: 'Programar',
          handler: async (data) => {
            console.log('guardar en el localstorage', data);
            localStorage.setItem('horaAlerta', data[0]);
            const alert = await this.alert.create({
              header: 'Programación de Alerta',
              subHeader: `Has programado una alerta para todos los días a las ${data} am.`,
              buttons:[
                'OK'
              ]
            });
            await alert.present();
            this.horaProgramada = true;
            this.repeatDaily();
          }
        }
      ]
    });
    await alert.present();
  }

  showAlert(header, sub, msg) {
    this.alert.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['ok']
    }).then(alert => alert.present());
  }

  async ngOnInit() {
    const programada = localStorage.getItem('horaAlerta')
    if (programada) {
      this.horaProgramada = true
    } else {
      this.horaProgramada = false;
    }
    console.log(programada);
    this.getCitas();
    this.calculoFecha();
    this.name = localStorage.getItem('name');
    this.imagePerfil = localStorage.getItem('imagenPerfil');
    this.estado.actualMomento().subscribe((data: any) => {
      this.actualMomento = data;
      console.log(data)
      this.estadoActual();
    })


    let cargaPublic = localStorage.getItem('role');
    let start = localStorage.getItem('startPregnancy');
    /* const start = localStorage.getItem('startPregnancy') */
    if (cargaPublic == 'user' && !start) {
      this.datosPvr.getStartPregnacy().subscribe(data => {
        this.params = data;
      }, async err => {
        /*  let popover = await this.popover.create({
             component:CalcComponent
         });
         await popover.present(); */
      })
      this.calculoFecha();
    } else {
      /* const popover = await this.popover.create({
        component:FechaPregnancyComponent,
        backdropDismiss: false
      });
      await popover.present(); */
      this.calculoFecha();
    }
  }

  async estadoActual() {
    if (this.actualMomento && this.actualMomento.status !== 'active') {
      const alert = await this.alert.create({
        header: "Tenemos Inconvenientes",
        subHeader: "En estos momentos tenemos algunos inconvenientes con la aplicaciòn, mil disculpas..., prueba en unos minutos más, por favor!!...",
        backdropDismiss: false
      });
      await alert.present();
    }
  }

  updateSession(){
    const datosUser = JSON.parse(localStorage.getItem('authorization'));
    let data = {
      userId: datosUser.patientId,
      app:'mamapp',
      date: new Date(),
      role: datosUser.role,
      session: datosUser.sessionId
    }
    this.notasServ.upSession(data).subscribe(resp => {
      console.log('devuelta guardada.',resp);
    })
  }

  async calculoFecha() {
    const loading = await this.loadinCtrl.create({
      message: "cargando categorías....",
      /* duration: 4000 */
    });
    await loading.present();
    /* console.log('parametros:', this.params); */
    const initPregnancy = localStorage.getItem('startPregnancy')
    if (initPregnancy) {
      this.fecha = moment(localStorage.getItem('startPregnancy')).clone();
      this.today = moment();
    } else {
      //si no encuentra una fecha , estoy pasandole una fecha al azahar para que tenga contenido,
      //la idea es poder seguin con la siguiente acción para poner manualmente mis datos,
      /* this.fecha = moment().diff(20, 'w'); */
    }
    this.fecha = moment(localStorage.getItem('startPregnancy')).clone();
    // aqui calcula la cantidad de semanas transcurridas
    const totalDays = this.today.diff(this.fecha, 'days');
    this.total = this.today.diff(this.fecha, 'weeks');
    console.log('this.total ==',this.total)
    /* aqui calculo el dia pendiente */
    this.diasPendientes = totalDays - (this.total * 7);
    this.totaldias = this.total.toString();
    /* cuanto tiempo ha pasado desde la concepcion */
    const start = moment(this.fecha);
    const cuanto = start.fromNow(true);
    /*   aqui les sumamos las 40 semanas a la fecha inicial para poder tener el ultimo dia de parto */
    const posible = start.add(41, 'w');
    this.posible = posible;
    const posibleDays = posible.diff(this.today, 'd');
    /* console.log('posibleDays:', posibleDays); */
    this.fechaPosible = posible.diff(this.today, 'w');
    const diasFaltantes = posibleDays - (this.fechaPosible * 7);
    this.diasFaltantes = diasFaltantes;
    /* console.log('diasFaltantes:', diasFaltantes); */

    this.cantidad = this.total;
    console.log(this.cantidad);
    this.mostrar = true;
    if (!this.notasFiltro) {
      this.notasServ.getNotes().subscribe(data => {
        data.forEach(element => {
          element.semana = Number(element.semana);
        });
        data.sort((a,b) => b.semana - a.semana);
        this.notas = data;
        console.log('todas las notas:', this.notas);
      }, err => {

      },
        () => {
          loading.dismiss();
        });
    } else {
      let elfilter = this.notasFiltro;
      console.log(elfilter);
      this.notasServ.getNotesFilter(elfilter).subscribe(data => {
        console.log('lo que me llega del filtro:', data); 
        this.notas = data
        console.log(this.notas);

      });
      const notas = this.notas.filter(x => x.semana.toNumber())
      this.notasFiltro = notas;
    };

  }


  goToChat() {
    this.router.navigateByUrl('/evolucion');
  }

  goToEvolution() {
    console.log('me llevara a evolución');
  }

  doRefresh(refresher) {
    this.notasServ.getNotes().subscribe(data => {
      this.notas = data;
      refresher.complete();
    });
  }

  async openFilters(ev: any) {
    /* console.log('abrir filtros'); */
    const popover = await this.popover.create({
      component: FiterComponent,
      event: ev,
      animated: true
    });
    await popover.present();
  }

  async openModalDetailBaby(nota) {
    console.log('abrir modal con 3d bebe', nota);
    const popover = await this.popover.create({
      component: BabyComponent,
      cssClass: 'modal-baby',
      componentProps: nota,
      translucent: true
    });
    return await popover.present();
  }

  openModalTrans(cardTrans) {
    console.log('abriendo detalle modal trans', cardTrans);
  }


  async openCalc() {
    /* let alert = await this.alert.create({
        header:'Ingresa la nueva fecha',
        inputs:[
          {
            name: 'fecha',
            type: 'date',
            label: 'nueva fecha',
          }
        ],
        buttons:[
          {
            text:'Ingresar',
            handler:(data)=>{
              console.log(data.fecha);
              localStorage.setItem('startPregnancy', data.fecha);
              this.calculoFecha();
            }
          }
        ]
    });
    await alert.present(); */
    const popoverCalc = await this.modalCtrl.create({
      component: RecalcdateComponent,
      cssClass: "RecalcModalControl",
    });
    await popoverCalc.present();
  }


  async openModalControls() {
    console.log('abrir modal de controles');
    /*  const modal = await this.modalCtrl.create({
       component: NextControlsComponent,
       cssClass: "wideModalControl",
     });
     return await modal.present(); */
    this.alertZoom();
  }

  async alertZoom() {
    const alert = await this.alert.create({
      header: "Proximamente",
      subHeader: "dentro de poco sabrrás exactamente cuando te tocan tus proximos controles y que pasará en cada uno",
      buttons: [
        {
          text: 'entiendo',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

  ionViewCanLeave() {
    this.name = "";
  }
  openPageCitas() {
    this.router.navigate(['citas-pendientes']);
  }

  getCitas() {
    this.appointmenSrv.getAppointmentsPeruser().subscribe(data => {
      this.dates = data.length;
      console.log('this.dates:', this.dates.length);
    });
  }

}
