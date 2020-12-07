import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/features/auth/guards/auth.guard';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./core/features/auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'dashboard',
    loadChildren: () => import('./core/features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate:[AuthGuard]
  },

  {
    path: '',
    redirectTo: 'dashboard/users',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
