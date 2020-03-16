import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotasService } from '../../service/notas.service';
import * as moment from 'moment';
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
   public  imagePerfil;
   @Input ('data') data;
   public numberControl = 5;
   public dias = '3';
  public date; 
  
  constructor( public router : Router,
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
    private activateRoute: ActivatedRoute) {
       this.plt.ready().then(()=>{
         this.localNoti.on('click').subscribe(res =>{
          console.log('click:', res);
           let msg = res.data ? res.data.mydata : "";
            this.showAlert(res.title, res.text, msg)
         });
         this.localNoti.on('trigger').subscribe(res =>{
          console.log('trigger:', res);
          let msg = res.data ? res.data.mydata : "";
          this.showAlert(res.title, res.text, msg)
         });
       });
       this.activateRoute.params.subscribe((date) =>{
         console.log('params', date);
         this.date = date;
         console.log(this.date);
       })
    }
              /*  openModalAviso(ms: number){
                console.log('abri la ventana para aviso diario');
                this.localNoti.schedule({
                  title: `mi ${ms} notificacion`,
                  text: `detalle de la descripción`,
                  trigger: {at: new Date(new Date().getTime() + ms)},
                })
              } */
              scheduleNotification(){
                this.localNoti.schedule({
                  id: 1,
                  title: "Atención",
                  text: 'Notificacion de Omar',
                  data: {mydata: 'Data Oculta'},
                  sound:'file://sound.mp3',
                  trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND},
                  foreground: true,
                  icon:'https://www.aviva.pe/assets/svg/logo.svg'
                });
              }

              recurringNotification(){
                this.localNoti.schedule({
                  id: 22,
                  title: "Recurrente",
                  text: 'Notificacion de Omar',
                  data: {mydata: 'Data Oculta'},
                  trigger: { every: {hour:16, minute: 35}},
                  /* foreground: true */
                });
              }
          
              repeatDaily(){
                this.localNoti.schedule({
                  id: 42,
                  title: "Good mornig",
                  text: 'Notificacion de Omar',
                  data: {mydata: 'Data Oculta'},
                  trigger: { every: ELocalNotificationTriggerUnit.MINUTE},
                  /* foreground: true */
                });
              }
          
              showAlert(header, sub, msg){
                  this.alert.create({
                    header: header,
                    subHeader:sub,
                    message: msg,
                    buttons: ['ok']
                  }).then(alert => alert.present());
              }
   
    async ngOnInit() {

      
        this.name = localStorage.getItem('name');
        this.imagePerfil = localStorage.getItem('imagenPerfil');


      this.estado.actualMomento().subscribe((data:any) =>{
        this.actualMomento = data;
        console.log(data)
        this.estadoActual();
      })
      

    let cargaPublic = localStorage.getItem('role');
    let start = localStorage.getItem('startPregnancy');
    /* const start = localStorage.getItem('startPregnancy') */
    if (cargaPublic == 'user' && !start) {
      this.datosPvr.getStartPregnacy().subscribe( data => {
        this.params = data;
      },async err =>{
       /*  let popover = await this.popover.create({
            component:CalcComponent
        });
        await popover.present(); */
      })
        this.calculoFecha();
    }else {
        /* const popover = await this.popover.create({
          component:FechaPregnancyComponent,
          backdropDismiss: false
        });
        await popover.present(); */
        this.calculoFecha();
    }    
  }
  
  async estadoActual(){
    if(this.actualMomento && this.actualMomento.status !== 'active'){
      const alert = await this.alert.create({
        header:"Tenemos Inconvenientes",
        subHeader:"En estos momentos tenemos algunos inconvenientes con la aplicaciòn, mil disculpas..., prueba en unos minutos más, por favor!!...",
        backdropDismiss: false
    });
    await alert.present();
    }
  }

  async calculoFecha(){
      let loading = await this.loadinCtrl.create({
        message:"cargando categorías....",
        duration:4000
      });
      await loading.present();
      /* console.log('parametros:', this.params); */
      const initPregnancy = localStorage.getItem('startPregnancy')
      if(initPregnancy){
        this.fecha = moment(localStorage.getItem('startPregnancy')).clone();
        this.today = moment();
      }else{
        //si no encuentra una fecha , estoy pasandole una fecha al azahar para que tenga contenido,
        //la idea es poder seguin con la siguiente acción para poner manualmente mis datos,
        /* this.fecha = moment().diff(20, 'w'); */
      }
        /* this.fecha = moment(localStorage.getItem('startPregnancy')).clone(); */
  
        // aqui calcula la cantidad de semanas transcurridas
        const totalDays = this.today.diff(this.fecha, 'days');
        this.total = this.today.diff(this.fecha, 'weeks');
  
        /* aqui calculo el dia pendiente */
        this.diasPendientes =  totalDays - (this.total * 7 )  ;
        this.totaldias = this.total.toString();
  
        /* cuanto tiempo ha pasado desde la concepcion */
        const start = moment(this.fecha);
        const cuanto = start.fromNow(true);
        /* console.log('cuanto', cuanto); */
  
        /*   aqui les sumamos las 40 semanas a la fecha inicial para poder tener el ultimo dia de parto */
        const posible = start.add(41, 'w');
        this.posible = posible;
        const posibleDays = posible.diff(this.today, 'd');
        /* console.log('posibleDays:', posibleDays); */
        this.fechaPosible = posible.diff(this.today, 'w');
        const diasFaltantes =  posibleDays - (this.fechaPosible * 7) ;
        this.diasFaltantes = diasFaltantes;
        /* console.log('diasFaltantes:', diasFaltantes); */
       
       this.cantidad = this.total; 
        this.mostrar = true;
        if (!this.notasFiltro) {
          this.notasServ.getNotes().subscribe(data => {
            this.notas = data;
            console.log('todas las notas:', this.notas); 

            /* this.notasServ.getNotesTrans().subscribe(data =>{
              this.dataTrans = data;
              console.log('dataTrans', this.dataTrans);
            }); */
           
          });
        } else {
          let elfilter = this.notasFiltro;
          this.notasServ.getNotesFilter(elfilter).subscribe(data => {
            /* console.log('lo que me llega del filtro:', data); */
            this.notas = data
            console.log(this.notas);
          
          });
          this.notasFiltro = this.notas;
        };
        
  }


  goToChat(){
    this.router.navigateByUrl('/evolucion');
  }

  goToEvolution(){
    console.log('me llevara a evolución');
  }
  
  doRefresh(refresher) {
    this.notasServ.getNotes().subscribe(data => {
      this.notas = data;
      refresher.complete();
    });
  }

  async openFilters(ev:any){
    /* console.log('abrir filtros'); */
    const popover = await this.popover.create({
      component: FiterComponent,
      event: ev,
      animated: true
    });
    await popover.present();
  }

  async openModalDetailBaby(nota){
      console.log('abrir modal con 3d bebe',nota);
      const modal = await this.modalCtrl.create({
        component:BabyComponent,
        componentProps:nota
      });
      return await modal.present();
  } 

  openModalTrans(cardTrans){
    console.log('abriendo detalle modal trans', cardTrans);
  }


    async openCalc(){
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

 
    async openModalControls(){
      console.log('abrir modal de controles');
      const modal = await this.modalCtrl.create({
        component: NextControlsComponent,
        cssClass: "wideModalControl",
      });
      return await modal.present();
    }

  }
