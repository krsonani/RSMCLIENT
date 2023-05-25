import { Component, OnInit } from '@angular/core';
import { Profile } from './profile';

@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.css']
})
export class CustomerprofileComponent implements OnInit {

  constructor() { }

  userProfile : Profile = {
    name: '',
    email: '',
    phoneNum: '',
  }

  ngOnInit(): void {
  }

  onClick(){
    
  }

  



}
