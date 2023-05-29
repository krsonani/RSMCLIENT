import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AppService } from '../app/app.service';
import { CustomerprofileService } from '../customerprofile/customerprofile.service';
import { Profile } from '../customerprofile/profile';
import { CustomerupdateprofileService } from './customerupdateprofile.service';
import { Updateprofile } from './updateprofile';

@Component({
  selector: 'app-customerupdateprofile',
  templateUrl: './customerupdateprofile.component.html',
  styleUrls: ['./customerupdateprofile.component.css']
})
export class CustomerupdateprofileComponent implements OnInit {
  @Output() content=new EventEmitter<string>();

  constructor(private service : CustomerupdateprofileService, private route:Router,private appservice:AppService) { }
  previousName:string='';
  userProfile : Updateprofile = {
    uids:-1,
    name: '',
    email: '',
    phoneNum: '',
    password:''
  }
  error: any = {};
  fetchError:string = "";

  ngOnInit(): void {
    this.fetchCurrentUser()
  }
  fetchCurrentUser()
  {
    this.service.getCustomer().subscribe({
      next:(res)=>{
        // console.log(res);
        this.userProfile.uids = res.uids;
        this.userProfile.name = res.name;
        this.previousName=res.name;
        this.userProfile.email = res.email;
        this.userProfile.phoneNum = res.phoneNum;
        this.userProfile.password = res.password;
        console.log(this.userProfile);
      },error:(error)=>{
        console.log(error);
        this.fetchError="Something Went Wrong"
      }
    })
  }
  handleUpdate(){
    // console.log(this.userProfile);
    this.service.updateCustomerProfile(this.userProfile).subscribe({
      next:(res)=>{
        console.log(res);
        this.appservice.sweetAlertSuccess("Profile Updated!!")
        this.content.emit("profile");
        this.fetchCurrentUser();
      }, error:(error)=>{
        console.log(error);
        this.appservice.sweetAlertError("Something Went Wrong!!")
        this.fetchError="Something Went Wrong"
      }
    })
  }
  onPhoneNumChange(str: string) {
    if (!this.isValidPhoneNum(str)) {
      this.error.phone = "Phone number should be of 10 digits and should contain only number";
    }
    else {
      this.error.phone = "";
    }
  }
  onNameChange(str:string)
  {
    if(!this.isValidName(str))
    {
      this.error.name="Name should contain only Alphabets";
    }
    else {
      this.error.name = "";
    }
  }
  private isValidPhoneNum(phoneNum: string): boolean {
    // Regular expression for phone number validation
    const phoneNumRegex = /^[0-9]{10}$/;
    return phoneNumRegex.test(phoneNum);
  }
  private isValidName(name: string): boolean {
    // Regular expression for phone number validation
    const nameRegex = /^[A-Za-z\\s]+$/;
    return nameRegex.test(name);
  }

}
