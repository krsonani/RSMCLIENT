import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerprofileService } from './customerprofile.service';
import { Profile } from './profile';

@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.css']
})
export class CustomerprofileComponent implements OnInit {

  constructor(private service : CustomerprofileService, private route:Router) { }

  userProfile : Profile = {
    name: '',
    email: '',
    phoneNum: '',
  }

  fetchError:string = "";

  ngOnInit(): void {
      this.service.getCustomer().subscribe({
        next:(res)=>{
          // console.log(res);
          this.userProfile.name = res.name;
          this.userProfile.email = res.email;
          this.userProfile.phoneNum = res.phoneNum;
          // console.log(this.userProfile);
        },error:(error)=>{
          console.log(error);
          this.fetchError="Something Went Wrong"
        }
      })
  }

  handleEdit(){
    // console.log("clicked");
    this.route.navigate(['/updateprofile']); //change the path
  }

}
