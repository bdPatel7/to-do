import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilService } from '../services/util.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedGuard implements CanActivate {
  constructor(private utilService: UtilService, private router: Router){}
  canActivate(): boolean{

    const isAuth = this.utilService.isAuthenticated();
    if (isAuth) {
      this.router.navigate(['/to-do']);
      return false;
    }
    return true;
  }
  
}
