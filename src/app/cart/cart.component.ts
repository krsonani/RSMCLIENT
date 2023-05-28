import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  //cartItems:any;
  @Input() activeTable:string[]=[];
  @Input() userid:string='';
  @Input() cartItems:any[]=[]; //input from food-menu 
  @Output() outputCartItems=new EventEmitter();

  orderItem: Order = {
      userid:'',
      tableIds:[],
      foodids:[],
      foodItem:{},
      totalPrice: 0
  };

  

  calculateTotal(){
    // console.log(this.cartItems.length);
    this.orderItem.totalPrice=0;
    for (let index = 0; index < this.cartItems.length; index++) {
    
        this.orderItem.totalPrice += (this.cartItems[index].quantity * this.cartItems[index].price);
        // console.log(this.orderItem.totalPrice);

    }
    // console.log(this.orderItem.totalPrice);
  }

  ngOnInit(): void {   
    console.log("init called");
    console.log(this.cartItems);
    this.outputCartItems.emit(this.cartItems);
    console.log(this.activeTable);
    //calculate inital Total Price
    this.calculateTotal();
    
    //get food testing   
    
  }

  id:number = 1;

  decreaseQuantity(item:Cart){
      
    item.quantity-=1;
    this.calculateTotal();
    this.outputCartItems.emit(this.cartItems);
    console.log(this.cartItems);
    
    
  }
  
  increaseQuantity(item:Cart){
    item.quantity+=1;
    this.calculateTotal();
    this.outputCartItems.emit(this.cartItems);
  }

  
  removeItem(item:Cart){
    item.quantity=0;
    this.calculateTotal();

    this.cartItems = this.cartItems.filter((cartItem)=>{ item !== cartItem })

    console.log(this.cartItems);
    this.outputCartItems.emit(this.cartItems);
  }


  placeOrder(){
    this.orderItem.userid=this.userid;
    this.orderItem.tableIds=this.activeTable;
    for(let item of this.cartItems){
      this.orderItem.foodids.push(item.fid);
      this.orderItem.foodItem[item.fid]=item.quantity;
    }
    console.log(this.orderItem);

    //place the order
    this.service.addOrder(this.orderItem).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartItems=[];
        console.log(this.cartItems);
        this.outputCartItems.emit(this.cartItems);
        this.calculateTotal();

      },error:(error)=>{
        console.log(error);
      }
    })
  }

}
