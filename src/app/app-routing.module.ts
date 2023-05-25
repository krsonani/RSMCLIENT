import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerprofileComponent } from './customerprofile/customerprofile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"profile",
    component:CustomerprofileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
