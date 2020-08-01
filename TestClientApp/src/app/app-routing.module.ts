import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationCheckService } from 'src/services/authentication-check.service';


const routes: Routes = [
  { path: '', loadChildren: () => import('src/components/home/home.module').then(m => m.HomeModule), canActivate: [AuthenticationCheckService] },
  { path: 'home', loadChildren: () => import('src/components/home/home.module').then(m => m.HomeModule), canActivate: [AuthenticationCheckService] },
  { path: 'login', loadChildren: () =>  import('src/components/login/login.module').then(m => m.LoginModule) },
  { path: 'users', loadChildren: () =>  import('src/components/users/users.module').then(m => m.UsersModule), canActivate: [AuthenticationCheckService] },
  { path: 'page2', loadChildren: () =>  import('src/components/page2/page2.module').then(m => m.Page2Module), canActivate: [AuthenticationCheckService] },
  { path: 'page3', loadChildren: () =>  import('src/components/page3/page3.module').then(m => m.Page3Module), canActivate: [AuthenticationCheckService] },
  { path: 'user-form', loadChildren: () => import('src/components/user-form/user-form.module').then(m => m.UserFormModule), canActivate: [AuthenticationCheckService] },
  //{ path: '**', loadChildren: () =>  import('src/components/home/home.module').then(m => m.HomeModule), canActivate: [AuthenticationCheckService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
