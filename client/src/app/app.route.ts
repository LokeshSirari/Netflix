import { RouterModule, Routes } from '@angular/router';
import { AuthGuard} from './app.auth-guard';
import { HomeComponent} from './home/home.component';
import { AdminComponent} from './admin/admin.component';
import { VerificationComponent} from './verification/verification.component'
export const route: Routes = [
    { path: 'home', component: HomeComponent } ,
    {path:'', component: HomeComponent},
    {path:'verify/:code',component:VerificationComponent},
    { path: 'admin', component: AdminComponent }
  ]  