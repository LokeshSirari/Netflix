import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import{ RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpModule } from '@angular/http';
import {ConnectService} from './connect.service';
import { route } from './app.route';
import { AuthGuard } from './app.auth-guard';
import { HeaderComponent } from './header/header.component';
import { VerificationComponent } from './verification/verification.component';
import { AdminComponent } from './admin/admin.component';
import { CatageryComponent } from './catagery/catagery.component';
import { UserComponent } from './user/user.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    VerificationComponent,
    AdminComponent,
    CatageryComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(route),
    HttpModule
  ],
  providers: [ConnectService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
