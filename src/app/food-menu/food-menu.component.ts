import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ManagerCategoryCrudService } from '../manager-category-crud/manager-category-crud.service';
import { FoodMenuService } from './food-menu.service';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.css']
})
export class FoodMenuComponent implements OnInit {

  @Input() activeTable: string[] = [];
  constructor(private service: FoodMenuService, private mccs: ManagerCategoryCrudService) { }

  categories: any;

  foodlist: any;

  @Input() typeUser: string = '';

  addToCartFoods: any[] = [];

  @Output() cartItems = new EventEmitter();
  @Input() outputCartItems: any[] = []; //from cart to food-menu

  ngOnInit(): void {
    this.addToCartFoods=this.outputCartItems;
    console.log(this.outputCartItems);

    this.mccs.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categories = res;
      }
    });

    this.service.getAllFood().subscribe({
      next: (res) => {
        console.log(res);
        this.foodlist = res;
      }
    })
  }

  toggleCategory(category: any) {
    console.log(category);
    category.expanded = !category.expanded;
  }

  addToCart(food: any) {
    food.quantity = 1;
    this.addToCartFoods = [...this.addToCartFoods, food];
    this.cartItems.emit(this.addToCartFoods);
  }

  removeFromCart(food: any) {

    this.addToCartFoods = this.addToCartFoods.filter(foodObj => food.fid != foodObj.fid);

    //need to update this
    this.cartItems.emit(this.addToCartFoods);
    localStorage.setItem("foodList", JSON.stringify(this.addToCartFoods))
    console.log(this.addToCartFoods);
  }

  compareCategoryName(c1: string, c2: string): boolean {
    if (c1 === c2)
      return true;
    else
      return false;
  }
  
  checkFoodInCart(item: any): boolean {
   
    for (let cartitem of this.addToCartFoods) {

      if (item.fid == cartitem.fid) {

        return true;
      }
    }
    return false;
  }

}
