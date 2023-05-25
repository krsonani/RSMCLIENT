import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerCategoryCrudComponent } from './manager-category-crud/manager-category-crud.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"managerCategoryCrud",
    component:ManagerCategoryCrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
