import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const authRoutes: Routes = [
    {
        path: 'signin',
        component: SignInComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    }
]


@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [

    ]
})
export class AuthRoutingModule {

}