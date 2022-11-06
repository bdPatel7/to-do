import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private emailRegex: RegExp = /^([A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9]))$/;
  
  constructor(
    private router:Router,
  ) { }

  getEmailRegex(): RegExp{
    return this.emailRegex
  }

  setKeyVakue(key:string, value: string): void{
    localStorage.setItem(key ,value);
  }

  isAuthenticated(): boolean {
    return !!this.getValue('token');
  }
  
  getValue(key: string): any {
    return localStorage.getItem(key);
  }

  logout(): void{
      localStorage.removeItem('token');
      this.router.navigate(['/']);
  }
}
