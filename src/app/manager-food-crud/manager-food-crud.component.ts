import { Component, OnInit } from '@angular/core';
import { ManagerFoodCrud } from './manager-food-crud';
import { ManagerFoodCrudService } from './manager-food-crud.service';

@Component({
  selector: 'app-manager-food-crud',
  templateUrl: './manager-food-crud.component.html',
  styleUrls: ['./manager-food-crud.component.css']
})
export class ManagerFoodCrudComponent implements OnInit {

  userForm : ManagerFoodCrud = {
    fname:'',
    fimage:'',
    description:'',
    price:0.0,
    categoryId : 0
  }

  errors: any={} ;

  constructor(private service : ManagerFoodCrudService) { }

  ngOnInit(): void {}

  onSubmit(){

    if(this.validateForm()){

      var res = this.service.addNewFood(this.userForm).subscribe();
      this.userForm = {
        fname:'',
        fimage:'',
        description:'',
        price:0.0,
        categoryId : 0
      };
    }
  }

  validateForm(): boolean {
    
    this.errors = {};

    console.log(this.userForm);
  
    if(this.userForm.fname.trim() === '')
      this.errors.fname = 'Name is required';
    else if(!(/^[A-Z]+[a-z/s]*$/.test(this.userForm.fname)))
      this.errors.fname = 'Please provide a valid name';

    if(this.userForm.fimage.trim() === '')
      this.errors.fimage = 'Image field is required';

    if(this.userForm.description.trim() === '')
      this.errors.description = 'Description field is required';
    else if(!(/^[A-Z]+[a-zA-Z0-9.,\s]*$/.test(this.userForm.description)))
      this.errors.description = 'Please provide a valid description';
    
    if(this.userForm.price <= 0 || this.userForm.price == null)
      this.errors.price = 'Please provide a valid price'

    if(this.userForm.categoryId == 0)
      this.errors.cid = 'Please select an option'

    if(Object.keys(this.errors).length === 0)
      return true;
    else
      return false;
  }

  onClick(id : Number){
    console.log("inside onCLick");
  }

}
