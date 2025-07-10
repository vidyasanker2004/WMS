import { Routes } from '@angular/router';
import { AuthGuard } from '../../../auth/auth-guard';

export const companyRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () => import('./list-company/list-company').then(m => m.ListCompany),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./edit-company/edit-company').then(m => m.EditCompany),
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    loadComponent: () => import('./create-company/create-company').then(m => m.CreateCompany),
    canActivate: [AuthGuard]
  },
];
