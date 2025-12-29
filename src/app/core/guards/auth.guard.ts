import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild{
  constructor(private routess:Router){}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   const log=localStorage.getItem("loggedIn");
   const jwt=localStorage.getItem("jwt");
      if(log==='true')return true ;
      else {
        this.routess.navigateByUrl('login');
      } 
return false ;
    }
}
   