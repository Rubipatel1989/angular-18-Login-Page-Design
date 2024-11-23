import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home/home.component';
import { AuthGuard } from './authguard/auth.guard';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { Login2Component } from './components/login2/login2.component';
import { Login3Component } from './components/login3/login3.component';
import { Login4Component } from './components/login4/login4.component';
import { Login5Component } from './components/login5/login5.component';
import { Login6Component } from './components/login6/login6.component';
export const routes: Routes = [
       {
              path: 'login',
              component: LoginComponent
       },
       {
              path: 'login-2',
              component: Login2Component
       },
       {
              path: 'login-3',
              component: Login3Component
       },
       {
              path: 'login-4',
              component: Login4Component
       },
       {
              path: 'login-5',
              component: Login5Component
       },
       {
              path: 'login-6',
              component: Login6Component
       },
       {
              path: 'register',
              component: RegisterComponent, canActivate: [AuthGuard]
       },
       {
              path: 'home',
              component: HomeComponent, canActivate: [AuthGuard]
       },
       {
              path: 'profile-update',
              component: ProfileUpdateComponent, canActivate: [AuthGuard]
       },
       {
              path: 'order-details',
              component: OrderDetailsComponent, canActivate: [AuthGuard]
       },
       {
              path: 'order-list',
              component: OrderListComponent, canActivate: [AuthGuard]
       },
       {
              path: 'user-profile',
              component: UserProfileComponent, canActivate: [AuthGuard]
       },
       {
              path: 'user-create',
              component: UserCreateComponent, canActivate: [AuthGuard]
       },
      
       { path: '', redirectTo: '/login', pathMatch: 'full' }

];
