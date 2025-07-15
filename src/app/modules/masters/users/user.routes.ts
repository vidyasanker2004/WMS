import { Routes } from '@angular/router';
import { AuthGuard } from '../../../auth/auth-guard';

export const usersRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () => import('./list-user/list-user').then(m => m.ListUser),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./edit-user/edit-user').then(m => m.EditUser),
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    loadComponent: () => import('./create-user/create-user').then(m => m.CreateUser),
    canActivate: [AuthGuard]
  },
];
