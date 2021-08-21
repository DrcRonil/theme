import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './Component/login/login.component';
import { UserComponent } from './Component/user/user.component'


const routes: Routes = [ 
  {path: '', component:LoginComponent},
  {path: 'user', component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true, useHash:true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
