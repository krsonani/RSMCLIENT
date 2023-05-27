import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ManagerCategoryCrudService } from '../manager-category-crud/manager-category-crud.service';
import { FoodMenuService } from './food-menu.service';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.css']
})
export class FoodMenuComponent implements OnInit {

  constructor(private service : FoodMenuService, private mccs : ManagerCategoryCrudService) { }

  categories: any;

  foodlist: any;
  

  addToCartFoods:any[] = []; 

  ngOnInit(): void {
    this.mccs.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res);
        this.categories = res;
      }
    });

    this.service.getAllFood().subscribe({
      next:(res)=>{
        console.log(res);
        this.foodlist = res;
      }
    })
  }

  toggleCategory(category : any){
    console.log(category);
    category.expanded = !category.expanded;
  }

  addToCart(food : any){
    console.log(food);
    food.addedToCart = !food.addedToCart;
    food.quantity=1;
    this.addToCartFoods = [...this.addToCartFoods, food];
    localStorage.setItem("foodList",JSON.stringify(this.addToCartFoods))
    console.log(this.addToCartFoods);
  }

  removeFromCart(food : any){
    food.addedToCart = !food.addedToCart;

    this.addToCartFoods = this.addToCartFoods.filter(foodObj => food.fid != foodObj.fid);
    localStorage.setItem("foodList",JSON.stringify(this.addToCartFoods))
    console.log(this.addToCartFoods);
  }

  compareCategoryName(c1: string, c2:string): boolean{
    if(c1===c2)
      return true;
    else
      return false;
  }
}
