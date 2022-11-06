import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { DetailResolver } from './resolvers/detail.resolver';
import { ListResolver } from './resolvers/list.resolver';
import { ToDoComponent } from './to-do.component';

const routes: Routes = [
  {
    path:'',
    component:ToDoComponent,
    children:[
      { path: '', 
        redirectTo:'list',
        pathMatch:'full'
      },
      {
        path: 'list',
        resolve: {
          data: ListResolver,
        },
        component:ListComponent
      },
      {
        path: 'add',
        component:AddComponent
      },
      {
        path: 'add/:id',
        resolve: {
          data: DetailResolver,
        },
        component:AddComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToDoRoutingModule { }
