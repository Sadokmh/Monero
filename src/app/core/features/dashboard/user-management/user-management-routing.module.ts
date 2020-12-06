import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';

const userManagementRoutes: Routes = [
    {
        path: '',
        component: UsersComponent
    }
]


@NgModule({
    imports: [
        RouterModule.forChild(userManagementRoutes)
    ],
    exports: [

    ]
})
export class UserManagementRoutingModule {

}