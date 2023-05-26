import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerprofileComponent } from './customerprofile/customerprofile.component';
import { ManagerCategoryCrudComponent } from './manager-category-crud/manager-category-crud.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { TableComponent } from './table/table.component';
import { AddTableComponent } from './add-table/add-table.component';
import { CustomerupdateprofileComponent } from './customerupdateprofile/customerupdateprofile.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CustomerprofileComponent,
    ManagerCategoryCrudComponent,
    DashbordComponent,
    TableComponent,
    AddTableComponent,
    CustomerupdateprofileComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
