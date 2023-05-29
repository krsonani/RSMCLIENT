import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';
import { AppService } from '../app/app.service';
import { ManagerTableHandlerService } from './manager-table-handler.service';

@Component({
  selector: 'app-manager-table-handling',
  templateUrl: './manager-table-handling.component.html',
  styleUrls: ['./manager-table-handling.component.css']
})
export class ManagerTableHandlingComponent implements OnInit {

  listOfUsers: Map<any, any> = new Map();
  surplusUserList: any;
  @Input() typeUser: string = '';
  @Output() content = new EventEmitter<string>();
  tableContent: boolean = false;
  tableItems: any[] = [];
  isNaActivte: string[] = [];
  showNaToggle: boolean = false;
  selectedUserId:any;
  totalTableCap:number=0;

  constructor(private service: ManagerTableHandlerService, private appservice :AppService) { }

  ngOnInit(): void {
    this.getSurplusUsers();
    this.interval = setInterval(()=>{
      this.getSurplusUsers();
    },600000)
    
  }
  interval:any;
  getSurplusUsers() {

    this.service.getSurplusUsers().subscribe({
      next: (res) => {
        console.log(res);
        console.log(Object.keys(res));
        console.log(Object.values(res));
        this.listOfUsers.clear();
        for (let i = 0; i < Object.keys(res).length || i < Object.values(res).length; i++) {
          this.service.getUsersById(Object.keys(res)[i]).subscribe(
            {
              next: (response) => {
                console.log(response);
                this.listOfUsers.set(response, Object.values(res)[i]);
              }, error: (err) => {
                console.log(err);
              }
            }
          );
        }
        console.log(this.listOfUsers);

      },
      error: (err) => {
        console.log(err);

      }
    });

  }
  showTableContent(user:any) {
    this.selectedUserId=user;
    this.tableContent = true;
    this.showTable();
  }
  showTable() {
    this.service.showTable().subscribe({
      next: (res) => {
        console.log(res);
        this.tableItems = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  addNaTableIds(id: string) {
    if (this.isNaActivte.includes(id)) {
      this.isNaActivte = this.isNaActivte.filter((item) => item != id)
      console.log(this.isNaActivte);
      if (this.isNaActivte.length === 0) {
        this.showNaToggleChange(id);
      }

    } else {
      this.isNaActivte = [...this.isNaActivte, id]
      this.showNaToggleChange(id);
      console.log(this.isNaActivte);
    }



  }
  showNaToggleChange(id: string) {
    if (this.isNaActivte.includes(id)) {
      this.showNaToggle = true;
    } else {
      this.showNaToggle = !this.showNaToggle;
    }


  }
  onNaToggle() {
    console.log('assigned');

  }

  checkForHighlightd(tid: string) {
    return this.isNaActivte.includes(tid)
  }

  assignTables() {
    this.tableItems.map((item)=>{
     if(this.isNaActivte.includes(item.tid))
     {
      console.log(this.tableItems);
      console.log(this.isNaActivte);
      console.log(item.capacity);
      this.totalTableCap=this.totalTableCap+item.capacity;
     }
    })
    console.log(this.totalTableCap);
    console.log(this.listOfUsers.get(this.selectedUserId));
    
    if(this.listOfUsers.get(this.selectedUserId)<= this.totalTableCap)
    {
      console.log(this.selectedUserId);
      
      this.service.assignTables(this.isNaActivte,this.selectedUserId.uids).subscribe({
        next: (res) => {
          console.log(res);
          console.log("Tables Assigned");
          this.getSurplusUsers();
          this.tableContent = false;
          this.isNaActivte=[];
          this.showNaToggle = false;
          this.appservice.sweetAlertSuccess("Table allocated")
        },
        error:(err)=>{
          console.log(err);
          
        }
      });
    }else
    {
      this.totalTableCap=0;
      this.appservice.sweetAlertError("Total capacity of tables allocated should be more then no of people")
    }
 
  }


}
