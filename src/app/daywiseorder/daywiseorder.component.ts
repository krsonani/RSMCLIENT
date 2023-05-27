import { Component, OnInit } from '@angular/core';
import { DaywiseorderService } from './daywiseorder.service';

@Component({
  selector: 'app-daywiseorder',
  templateUrl: './daywiseorder.component.html',
  styleUrls: ['./daywiseorder.component.css']
})
export class DaywiseorderComponent implements OnInit {

  todaysOrders: any;
  roleType: string = '';
  userId: string = '';
  now: string = '';
  currentOrdertotalPrice: number = 0;
  pastOrdertotalPrice: number = 0;

  constructor(private service: DaywiseorderService) { }

  ngOnInit(): void {

    // Assign here the roletype and userId thats all,for Now I have Hardcoded this values for testing purpose...
    this.getOrderHistory();
    // console.log(todaysOrders);
    
  }

  billPayed() {
    // console.log("chal rha hai");
    this.service.updateBillGenerationStatus(this.userId).subscribe({
      next: (res) => {
        console.log(res);
        this.getOrderHistory();
        this.currentOrdertotalPrice=0;
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  getOrderHistory() {
    this.service.getCustomer().subscribe({
      next: (res) => {
        console.log(res);
        this.roleType = res.role.type;
        this.userId = res.uids;
        // console.log(this.roleType);
        // console.log(this.userId);

        if (this.roleType == 'MANAGER') {
          this.service.showDayWiseOrders().subscribe({
            next: (res) => {
              console.log(res);
              this.todaysOrders = res;
              for (let item of this.todaysOrders) {
                if (item.billGenerated == true) {
                  this.pastOrdertotalPrice += item.totalPrice;
                }
              }
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
              for (let item of this.todaysOrders) {
                if (item.billGenerated == false) {
                  this.currentOrdertotalPrice += item.totalPrice;
                }
              }
            }, error: (err) => {
              console.log(err);
            }
          })

        }

      }
    })
  }


}