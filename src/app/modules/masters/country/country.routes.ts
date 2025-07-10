import { Routes } from '@angular/router';
import { AuthGuard } from '../../../auth/auth-guard';

export const countryRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () => import('./country-list/country-list').then(m => m.CountryListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    loadComponent: () => import('./country-create/country-create').then(m => m.CountryCreateComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./country-edit/country-edit').then(m => m.CountryEditComponent),
    canActivate: [AuthGuard]
  },
];