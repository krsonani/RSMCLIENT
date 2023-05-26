import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
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

  constructor(private service : CustomerupdateprofileService, private route:Router) { }

  userProfile : Updateprofile = {
    uids:-1,
    name: '',
    email: '',
    phoneNum: '',
    password:''
  }

  fetchError:string = "";

  ngOnInit(): void {
      this.service.getCustomer().subscribe({
        next:(res)=>{
          // console.log(res);
          this.userProfile.uids = res.uids;
          this.userProfile.name = res.name;
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
        this.route.navigate(['/profile']);
      }, error:(error)=>{
        console.log(error);
        this.fetchError="Something Went Wrong"
      }
    })
  }

}
