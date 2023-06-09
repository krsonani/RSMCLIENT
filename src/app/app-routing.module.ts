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
import { FoodMenuComponent } from './food-menu/food-menu.component';
import { ManagerTableHandlingComponent } from './manager-table-handling/manager-table-handling.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

const routes: Routes = [
  {
    path:"",
    component:LandingpageComponent


  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"dashbord",
    component:DashbordComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
