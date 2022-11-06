import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoRoutingModule } from './to-do-routing.module';
import { ToDoComponent } from './to-do.component';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { AppCoreModule } from '../app-core/app-core.module';


@NgModule({
  declarations: [
    ToDoComponent,
    AddComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ToDoRoutingModule,
    AppCoreModule
  ]
})
export class ToDoModule { }
