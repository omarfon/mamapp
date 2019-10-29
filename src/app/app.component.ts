import { Component } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthoService } from './service/autho.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  navigate : any;
  public nombre;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public routes: Router,
    private menu: MenuController,
    public nav: NavController,
    public autho: AuthoService
  ) {
    this.sideMenu();
    this.initializeApp();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.nombre = localStorage.getItem('patientName')
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Home",
        url   : "/tabs",
        icon  : "home"
      },
      {
        title : "Mis Citas",
        url   : "/citas-pendientes",
        icon  : "alarm"
      },
     /*  {
        title : "Graficas",
        url   : "/graficas",
        icon  : "analytics"
      }, */
      {
        title : "Recetas",
        url   : "/recetas",
        icon  : "clipboard"
      }/* ,
      {
        title : "Cerrar sesión",
        url   : "/recetas",
        icon  : "recipes"
      }, */
    ]
  }

  closeSession(){
      localStorage.clear();
      /* localStorage.removeItem('role');
      localStorage.removeItem('authorization');
      localStorage.removeItem('id');
      localStorage.removeItem('photoUrl');
      localStorage.removeItem('name');
      localStorage.removeItem('startPregnancy');
      localStorage.removeItem('email');
      localStorage.removeItem('usuario');
      localStorage.removeItem('patientName');
      localStorage.removeItem('token');
      localStorage.removeItem('uid'); */
      this.autho.getKey().subscribe( (data:any) =>{
        localStorage.setItem('authorization', data.authorization );
        localStorage.setItem('role', data.role);
      }) 
    this.routes.navigate(['login']);
    this.menu.close('start');
    console.log('cerrar sesión');
  }

  goToDetailDatos(){
    this.routes.navigate(['datos-personales']);
  }
}
