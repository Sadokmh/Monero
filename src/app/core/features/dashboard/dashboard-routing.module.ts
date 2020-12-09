import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';

const dashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                component: MainComponent
            },
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