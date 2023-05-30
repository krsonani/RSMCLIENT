import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DashbordService } from './dashbord.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  stackStatus:string[]= [];
  username: string;
  content:string | undefined='';
  typeUser:string='';
  noOfCustomer:number=2;
  surplusUsers:any;
  activeTable:string[]=[];
  selectFoodItem:any = {};
  userid:string='';
  cartItems:any[]=[]; //output from food-menu going to cart
  interval:any = '';

  outputCartItems:any[]=[]; //output from cart going to food menu

  toShowWaitingQueuLogo:boolean=false;

  constructor(private service : DashbordService,private rout : Router) {
    this.username = ''; // Replace with the logged-in user's name
  }

  chnageContent(content:string)
  {
    if(this.content==="addFood"){
      this.selectFoodItem = {};
    }
    this.content =content;
    this.stackStatus.push(content);
  }

  onUpdateFood()
  {
    if(Object.keys(this.selectFoodItem).length===0)
      return true;
    return false;
  }

  onBack()
  {
    if(this.stackStatus.length!==1)
    this.stackStatus.pop();
    if(this.stackStatus.length===0)
    {
      if(this.typeUser==='CUSTOMER')
      this.content='';
      else
      this.content='viewtable'
    }else
    this.content=this.stackStatus.pop();
    
  }

  receiveContent(content:string)
  {
  this.chnageContent(content)
    console.log(content);
  }
  receiveActiveTable(activeTable:string[])
  {
    this.activeTable=activeTable;
    console.log(activeTable);
  }
  initializeCartItems(cartItems:any[]){
    this.cartItems=cartItems;
    console.log(this.cartItems);
  }

  initializeFoodItem(foodItem:any){
    this.selectFoodItem=foodItem;
    console.log(this.selectFoodItem);
    console.log("initializeFoodItem");
  }

  resetFoodItem(content:string){
    this.content = content;
    this.selectFoodItem = {};
  }

  setCartItems(outputCartItems:any[]){
    this.outputCartItems = outputCartItems;

    this.cartItems=outputCartItems;
    console.log(this.cartItems);
  }

  toShowWaitingQueuLogoSet(value:boolean)
  {
  
      this. toShowWaitingQueuLogo=value;
      this.chnageContent('');
      this.checkWaitingStatus(this.userid);

  }



  logout() {
    sessionStorage.removeItem("jwtToken");
    this.rout.navigate(['/login'])
    console.log('Logged out successfully!');
  }

  ngOnInit(): void {

    if(sessionStorage.getItem("jwtToken")===null)
    this.rout.navigate(['/'])
    this.interval = setInterval(()=>{
      this.validateJwtToken()
    },20000)
    this.service.getCustomer().subscribe({
      next:(res)=>{
        console.log(res);
        this.userid=res.uids;
        this.username=res.name;
        this.typeUser=res.role.type;
        if(this.typeUser=== 'MANAGER')
        this.content='viewtable';
        console.log(this.typeUser);
        
      },error:(err)=>{
        console.log(err);
      }
    })
  }



  validateJwtToken()
  {
    this.service.validateJwtToken().subscribe({
      next:(res)=>{console.log(res);
      },error:(err)=>{
        clearInterval(this.interval);
        this.logout();console.log(err);
      }
    })

    }


  showWaitingCount : any;
  displayMsg : string = '';
  isTableAllocation = false;

  onClickOfFloatingIcon(){
    Swal.fire({
      title: 'Waiting Queue Status',
      html: this.displayMsg
    });
  }

  onAllocationOfTableAlert(){
    Swal.fire({
      title: 'Table Status',
      html: this.displayMsg,
      allowOutsideClick:false,
      willClose: ()=>{
        if(this.isTableAllocation){
          this.chnageContent('foodManue');
        }
      }
    });
  }


  checkWaitingStatus(id:string){
   
    this.interval = setInterval(()=>{
      this.service.checkQueueForVacancy(id).subscribe({
        next:(res)=>{
          console.log(res);

          if(Object.keys(res)[0] === 'Table not found'){
            let temp = Object.values(res);
            let temp2 : any[] = temp;
            this.showWaitingCount = temp2[0];
            this.displayMsg = `Your waiting number ${ (this.showWaitingCount == undefined) ? " " : this.showWaitingCount }`;  
            console.log(this.displayMsg);
          }
          else{
            clearInterval(this.interval);
            let temp = Object.values(res);
            let temp2 : any[] = temp;
            this.showWaitingCount = temp2[0];
            this.activeTable = this.showWaitingCount;
            this.displayMsg = `Your table/s assigned are ${this.showWaitingCount}`;
            this.onAllocationOfTableAlert();
            this.isTableAllocation=true;
            this.toShowWaitingQueuLogo=false;
          }
        },
        error:(err)=>{
          console.log(err);
          
        }
      });
    },500)
  }

//Table not found: [3]

  clearCheckingWaitingStatus(){
    clearInterval(this.interval);
  }

  


}
