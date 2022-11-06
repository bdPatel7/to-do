import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToDoModel } from '../models/to-do';
import { ToDoService } from '../services/to-do.service';

@Injectable({
  providedIn: 'root'
})
export class DetailResolver implements Resolve<ToDoModel[]> {
  constructor(private todo: ToDoService, private toastr: ToastrService, private router: Router){
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ToDoModel[]> {    
    return this.todo.getToDo(route.params['id']).pipe(
      map((res) => res.data),
      catchError(error => {
        this.toastr.error(error.data.message);
        this.router.navigate(['/to-do/list'])
        return of([])
      }),
    );
  }
}
