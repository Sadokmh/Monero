import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/dashboard.reducers';
import { UserManagementModule } from './user-management/user-management.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user-management/store/effects';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    UserManagementModule,
    DashboardRoutingModule,
    StoreModule.forFeature('dashboard', reducers),
    EffectsModule.forFeature([UserEffects])

  ]
})
export class DashboardModule { }
