import { Component, OnInit } from '@angular/core';
import { Cart } from './cart';
import { CartService } from './cart.service';
import { Order } from './order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  constructor(private service:CartService) { }

  cartItems:Cart[] = [{
    name: 'Cheese Ball',
    price:20,
    quantity:1
  },{
    name: 'Chrispy Chicken',
    price:30,
    quantity:1
  }]

  orderItem: Order = {
      userid:2,
      tableIds:[1],
      foodids:[1],
      foodItem:{
        "1":3
      },
      totalPrice: 0
  };

  calculateTotal(){
    // console.log(this.cartItems.length);
    this.orderItem.totalPrice=0;
    for (let index = 0; index < this.cartItems.length; index++) {
    
        this.orderItem.totalPrice += (this.cartItems[index].quantity * this.cartItems[index].price);
        console.log(this.orderItem.totalPrice);

    }
    console.log(this.orderItem.totalPrice);
  }

  ngOnInit(): void {   
    console.log("init called");
    
    //calculate inital Total Price
    this.calculateTotal();

    //get food testing
    
  }

  id:number = 1;

  decreaseQuantity(item:Cart){
      
    item.quantity-=1;
    this.calculateTotal();
    
  }
  
  increaseQuantity(item:Cart){
    item.quantity+=1;
    this.calculateTotal();
  }

  
  removeItem(item:Cart){
    item.quantity=0;
    this.calculateTotal();
  }


  placeOrder(){
    this.service.addOrder(this.orderItem).subscribe({
      next:(res)=>{
        console.log(res);
      },error:(error)=>{
        console.log(error);
      }
    })
  }

}
