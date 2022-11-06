import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './app-core/guards/authenticated.guard';
import { UnauthenticatedGuard } from './app-core/guards/unauthenticated.guard';

const routes: Routes = [
  { path: '', redirectTo:'auth',pathMatch:'full' },
  {
    path: 'auth',
    canActivate: [UnauthenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'to-do',
    canActivate: [AuthenticatedGuard],
    loadChildren: () => import('./to-do/to-do.module').then(m => m.ToDoModule)
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
