import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { 
    path: 'login', 
    title: 'Login',  // Add route title
    loadComponent: () => import('./modules/login/login').then(m => m.LoginComponent) 
  },
  { 
    path: 'home', 
    title: 'Home',
    loadComponent: () => import('./modules/home/home').then(m => m.HomeComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'countries',
        loadChildren: () => import('./modules/masters/country/country.routes').then(m => m.countryRoutes)
      },   
      {
        path: 'states',
        loadChildren: () => import('./modules/masters/state/state.routes').then(m => m.StateRoutes)
      },
      {
        path: 'company',
        loadChildren: () => import('./modules/masters/company/company.routes').then(m => m.companyRoutes)
      }
    ]
  },
  // Add a wildcard route for 404 handling
  { path: '**', redirectTo: 'login' }
];
