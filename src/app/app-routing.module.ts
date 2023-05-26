import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerprofileComponent } from './customerprofile/customerprofile.component';
import { ManagerCategoryCrudComponent } from './manager-category-crud/manager-category-crud.component';
import { AddTableComponent } from './add-table/add-table.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DaywiseorderComponent } from './daywiseorder/daywiseorder.component';
import { ManagerFoodCrudComponent } from './manager-food-crud/manager-food-crud.component';
import { CustomerupdateprofileComponent } from './customerupdateprofile/customerupdateprofile.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"profile",
    component:CustomerprofileComponent
  },
  {
    path:"updateprofile",
    component:CustomerupdateprofileComponent
  },
  {
    path:"managerCategoryCrud",
    component:ManagerCategoryCrudComponent
  },
  {
    path:"managerFoodCrud",
    component:ManagerFoodCrudComponent
  },
  {
    path:"cart",
    component:CartComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"dashbord",
    component:DashbordComponent
  },
  {
    path:"addtable",
    component:AddTableComponent
  },
  {
    path:"dayWiseOrder",
    component:DaywiseorderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
