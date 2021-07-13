import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Http
import { HttpClientModule } from '@angular/common/http';

//constantes
import { environment } from 'src/environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFirestoreModule } from '@angular/fire/firestore';

//angularMaterial
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//components
/* import { ComponentsModule } from './components/components.module'; */
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//formularios

//Locale
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Facebook } from '@ionic-native/facebook/ngx'

import { NgxAgoraModule } from 'ngx-agora';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
/* import {NgxAgoraModule} from 'ngx-agora'; */

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    /*      NgxAgoraModule.forRoot({AppID: environment.agora.appId}), */
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxAgoraModule.forRoot({ AppID: environment.agora.appId }),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireMessagingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('combined-sw.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    { provide: LOCALE_ID, useValue: "es" },
    LocalNotifications,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
