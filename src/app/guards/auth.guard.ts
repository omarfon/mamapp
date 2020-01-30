import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements CanActivate {

        constructor(public router: Router){}
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        const id = localStorage.getItem('id');
        if(!id){
          this.router.navigate(['/login']);
          return false
        }else{
          return true;
        }
      }
}
