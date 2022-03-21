import { Component } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthoService } from './service/autho.service';
import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  navigate: any;
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
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sideMenu() {
    this.navigate =
      [
        {
          title: "Home",
          url: "/tabs",
          icon: "home"
        },
        {
          title: "Mis Citas",
          url: "/citas-pendientes",
          icon: "alarm"
        },
        {
          title: "Reserva control",
          url: "/tabs/tab2",
          icon: "document"
        },
        {
          title: "Recetas",
          url: "/recetas",
          icon: "medkit"
        }/* ,
      {
        title : "Cerrar sesión",
        url   : "/recetas",
        icon  : "recipes"
      }, */
      ]
  }

  closeSession() {
    localStorage.clear();
    this.routes.navigate(['/login']);
    this.menu.close('start');
    console.log('cerrar sesión');
  }

  goToDetailDatos() {
    this.routes.navigate(['datos-personales']);
  }
}
