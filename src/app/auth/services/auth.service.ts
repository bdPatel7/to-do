import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { LoginModel } from '../models/login';
import { delay, tap, timeout } from 'rxjs/operators';
import { ResponseBeanModel } from 'src/app/app-core/models/response-bean';
import { UtilService } from 'src/app/app-core/services/util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private SUCCESS_RES = { 
      success: true,
      data:{
        token: 'token'
      }
  };

  private FAILED_RES = {
      success: false,
      data:{
        err: 'Invalid Credentials'
      }
  }; 

  constructor(
    private util:UtilService
  ) { }

  login(model: LoginModel): Observable<any> {
    const {email, password} = model;
      return of(
        email.toLocaleLowerCase() === 'admin@gmail.com' && password.toLocaleLowerCase() === 'admin' ? this.SUCCESS_RES : this.FAILED_RES
        ).pipe(
          delay(1000),
           tap((response: ResponseBeanModel) => {
            if (response.success && response.data.token) {
                this.util.setKeyVakue('token',response.data.token);
                return response;
            } else{
              throw Error(response.data.err);
            }
        })
        )
  }
}
