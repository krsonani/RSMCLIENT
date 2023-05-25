import { Component, OnInit } from '@angular/core';
import { ManagerCategoryCrud } from './manager-category-crud';
import { ManagerCategoryCrudService } from './manager-category-crud.service';

@Component({
  selector: 'app-manager-category-crud',
  templateUrl: './manager-category-crud.component.html',
  styleUrls: ['./manager-category-crud.component.css']
})
export class ManagerCategoryCrudComponent implements OnInit {

  userForm : ManagerCategoryCrud = {
    cname:''
  }

  errorCategoryName:string='';

  categories: any;

  isCategoriesEmpty(): boolean {
    return !this.categories || this.categories.length === 0;
  }

  constructor(private service : ManagerCategoryCrudService) { }

  ngOnInit(): void {
    //this.categories = [];
    this.categories = [{"id":1,"cname":"Happy"},{"id":2,"cname":"Happy"}];
  }

  onSubmit(){

    if(this.validateForm()){

      var res = this.service.addNewCategory(this.userForm).subscribe();
      this.userForm.cname = '';
    }
  }

  validateForm():boolean {
    
    this.errorCategoryName = '';

    if(this.userForm.cname.trim() === '')
      this.errorCategoryName = 'Name is required';
    else if(!(/^[A-Z]+[a-z]*$/.test(this.userForm.cname)))
      this.errorCategoryName = 'Please provide only alphabets';
    
    if(this.errorCategoryName.length === 0)
      return true;
    else
      return false;
  }

  onClick(id : Number){
    console.log("inside onCLick");
    
    var res = this.service.removeCategoryById(id).subscribe();
  }

}
