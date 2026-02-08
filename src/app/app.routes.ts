import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './register/register.component';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { IdVerificationComponent } from './id-verification/id-verification.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, data: { title: 'Login' } },
    { path: 'register', component: RegisterComponent, data: { title: 'Register' } },
    {
        path: '', component: LayoutComponent,
        children: [


{ path: 'users', component: UserComponent },
{ path: 'verfication', component: IdVerificationComponent },
            { path: 'viewUser', component: ViewuserComponent, data: { title: 'viewUser' } },
        ]
    }
];
