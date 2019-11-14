import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DatosControlService } from '../../service/datos-control.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-controles',
  templateUrl: './controles.page.html',
  styleUrls: ['./controles.page.scss'],
})
export class ControlesPage implements OnInit {
  fechaIni: any;
  fechaFinal: string;
  encuentros: any;
  public message:boolean =  false;
  public user : string; 
  public usuario: string;
  public status;

  constructor(public datosControl: DatosControlService,
              public routes:  Router) { }

  ngOnInit() {
    const status = localStorage.getItem('status');
    if(status === 'unverified'){
      this.status = 'novalidado';
    }else{
      this.status = 'validado';
    }
    this.usuario = localStorage.getItem('role');
    if(this.usuario === 'public'){
      this.user = 'nouser'
    }else{
      this.user = 'user'
    }
    this.fechaIni = moment(localStorage.getItem('startPregnancy')).format('YYYY-MM-DD');
    // console.log('fecha inicio',this.fechaIni);
    let fechaFin = moment(localStorage.getItem('startPregnancy')).add(10 , 'M').format('YYYY-MM-DD');
    this.fechaFinal = fechaFin

    this.datosControl.getParams(this.fechaIni, this.fechaFinal).subscribe((data:any) =>{
            if(!data){
              this.message = true;
              }else{
                this.encuentros = data.encuentros;
              }
            }, err =>{
              this.message = true;
              return
            });
     console.log('los encuentros:', this.encuentros);
  }

  goToDetail(encuentro){
    console.log('el encuentro en goToDetail', encuentro);
    /* console.log('ira detalle de encuentro'); */
    let encuentroObj = JSON.stringify(encuentro)
    this.routes.navigate(['detailcontrol', encuentroObj]);
  }

  createDate(){
    /* this.navCtrl.push(CitasPage, {c: this.fechaIni }) */
    let c = {
      fechaIni : this.fechaIni
    }
    this.routes.navigate(['citas', c])
        console.log('mandar a la pagina citas', c);
  }

}
