import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const dashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'users',
                loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
            }
        ]
    }
]


@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes)
    ],
    exports: [

    ]
})
export class DashboardRoutingModule {

}