import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ResponseBeanModel } from 'src/app/app-core/models/response-bean';
import { ToDoModel } from '../models/to-do';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor() { }
  
  private list = this.getFromStorage();

  getToDoList(): Observable<ResponseBeanModel>{
    return of({
      success:true,
      data:this.list
    });
  }

  getToDo(id: string): Observable<ResponseBeanModel>{       
    const data = this.list.find(f => f.id?.toString() === id);
    if(data){
      return of({
        success: true,
        data
      })
    }else{
      return throwError({
        success: false,
        data: Error('No User Found')
      })
    }
  }

  addToDo(model: ToDoModel , id?:number): Observable<ResponseBeanModel>{
    this.updateInList(model, id);
    return of({success: true, data:{}}).pipe(
      delay(1000)
    )
  }

  deleteToDo(id:number): Observable<ResponseBeanModel>{
    this.list.splice(this.list.findIndex(f => f.id === id), 1);
    this.updateInStorage();
    return of({success: true, data:{}})
  }

  updateInList(model: ToDoModel, id?:number): void{
    if(id){
      this.list[this.list.findIndex(f => f.id === id)] = {...model, id}; 
    }else{
      const len = (this.list.length) || 1;
      this.list.push({...model, id: this.list.length ? ((this.list[len - 1].id as number) + 1) : 1})
    }
    this.updateInStorage();
  }

  updateInStorage(): void{
    localStorage.setItem('list', JSON.stringify(this.list));
    this.updateList();
  } 

  updateList(): void{
    this.list = this.getFromStorage();
  }

  private getFromStorage(): ToDoModel[]{
    return JSON.parse(localStorage.getItem("list") || "[]");
  }
}
