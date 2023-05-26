import { Component, OnInit } from '@angular/core';
import { Cart } from './cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  totalPrice:number=0;

  constructor() { }

  cartItems:Cart[] = [{
    name: 'Cheese Ball',
    price:20,
    quantity:2
  },{
    name: 'Chrispy Chicken',
    price:30,
    quantity:4
  }]


  ngOnInit(): void {
  }

  decreaseQuantity(item:Cart){
    if(item.quantity === 1){
      item.quantity = 1;
    } else{
      item.quantity-=1;
    }
  }

  increaseQuantity(item:Cart){
    item.quantity+=1;
  }

  updateQuantity(){

  }

  checkout(){}
  removeItem(){}
  onQuantityChange(){}
}
