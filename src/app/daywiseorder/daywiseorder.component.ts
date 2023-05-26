import { Component, OnInit } from '@angular/core';
import { DaywiseorderService } from './daywiseorder.service';

@Component({
  selector: 'app-daywiseorder',
  templateUrl: './daywiseorder.component.html',
  styleUrls: ['./daywiseorder.component.css']
})
export class DaywiseorderComponent implements OnInit {

  todaysOrders: any;
  roleType: String = '';
  userId: String = '';
  now: string = '';
  constructor(private service: DaywiseorderService) { }

  ngOnInit(): void {

 
   // Assign here the roletype and userId thats all,for Now I have Hardcoded this values for testing purpose...
    this.roleType='CUSTOMER';
    this.userId='2';
  
    if (this.roleType =='ADMIN') {
      this.service.showDayWiseOrders().subscribe({
        next: (res) => {
          console.log(res);
          this.todaysOrders = res;
        }, error: (err) => {
          console.log(err);
        }

      })

      this.now = new Date().toLocaleDateString();
    }
    else {
      this.service.getOrderByUserId(this.userId).subscribe({
        next: (res) => {
          console.log(res);
          this.todaysOrders = res;
        }, error: (err) => {
          console.log(err);
        }
      })

    }
  }

}