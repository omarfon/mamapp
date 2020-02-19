import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'start', pathMatch: 'full'
    
  },
  { path: 'start', loadChildren: './pages/start/start.module#StartPageModule' , canActivate:[NologinGuard]},
  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'citas', loadChildren: './pages/citas/citas.module#CitasPageModule' },
  { path: 'citas-pendientes', loadChildren: './pages/citas-pendientes/citas-pendientes.module#CitasPendientesPageModule' },
  { path: 'code', loadChildren: './pages/code/code.module#CodePageModule' },
  { path: 'controles/:c', loadChildren: './pages/controles/controles.module#ControlesPageModule' },
  { path: 'detail-week', loadChildren: './pages/detail-week/detail-week.module#DetailWeekPageModule' },
  { path: 'detailcontrol/:encuentroObj', loadChildren: './pages/detailcontrol/detailcontrol.module#DetailcontrolPageModule' },
  { path: 'detailpage/:datosObj', loadChildren: './pages/detailpage/detailpage.module#DetailpagePageModule' },
  { path: 'detailrecipe/:datosObj', loadChildren: './pages/detailrecipe/detailrecipe.module#DetailrecipePageModule' },
  { path: 'evolucion', loadChildren: './pages/evolucion/evolucion.module#EvolucionPageModule' },
  { path: 'financer/:datosObj', loadChildren: './pages/financer/financer.module#FinancerPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate:[AuthGuard]},
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'modal-no-service', loadChildren: './pages/modal-no-service/modal-no-service.module#ModalNoServicePageModule' },
  { path: 'recetas', loadChildren: './pages/recetas/recetas.module#RecetasPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'register/:data', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'register/:datosObj', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'recoverycode/:dataObj', loadChildren: './pages/recoverycode/recoverycode.module#RecoverycodePageModule' },
  { path: 'resumen', loadChildren: './pages/resumen/resumen.module#ResumenPageModule' },
  { path: 'resumen/:datosObj', loadChildren: './pages/resumen/resumen.module#ResumenPageModule' },
  { path: 'start', loadChildren: './pages/start/start.module#StartPageModule' },
  { path: 'facebook-register', loadChildren: './pages/facebook-register/facebook-register.module#FacebookRegisterPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
