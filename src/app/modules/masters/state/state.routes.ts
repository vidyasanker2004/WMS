import { Routes } from '@angular/router';
import { AuthGuard } from '../../../auth/auth-guard';

export const StateRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () => import('./State-list/State-list').then(m => m.StateListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    loadComponent: () => import('./State-create/State-create').then(m => m.StateCreateComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./State-edit/State-edit').then(m => m.StateEditComponent),
    canActivate: [AuthGuard]
  },
];