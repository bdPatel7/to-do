import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToDoModel } from '../models/to-do';
import { ToDoService } from '../services/to-do.service';

@Injectable({
  providedIn: 'root'
})
export class ListResolver implements Resolve<ToDoModel[]> {
  constructor(private todo: ToDoService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ToDoModel[]> {
    return this.todo.getToDoList().pipe(
      map(res => res.data),
      catchError(error => {
        return of([]);
      }),
    );;
  }
}
