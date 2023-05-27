import { ChangeDetectorRef, Component,  EventEmitter,  Input, OnChanges, OnInit, Output } from '@angular/core';
import { NgControl } from '@angular/forms';
import { TableService } from './table.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

 tableItems:any[]=[];
 tableIds:string[]=[];
 showToggle:boolean=false;
 showNaToggle:boolean=false;
 isHighlighted: boolean = false;
 isNaHighlighted:boolean=false;
 isActivte:string=''  ;
 isNaActivte:string=''  ;
 naTableIds:string[]=[];
 previousActivte:string='';
 previousNa:string='';
 toggle:boolean=true;
 goForWaiting:boolean=false;
 goForWaitingToManager:boolean=false;
 count:number=0;
 toShowWaitingQueuLogo:boolean=false;
 booktableIds:string[]=[];
 @Input() typeUser:string='';
 @Input() noOfCustomer:number=0;
 @Input() userid:string='';
 @Output() content=new EventEmitter<string>();
 @Output() activeTable=new EventEmitter<string[]>();
 
  constructor(private service : TableService,private cdr : ChangeDetectorRef) { }

  ngOnInit(): void {
  if(!this.goForWaitingWithManager())
  {
    this.showTable()
  }else
  {
    this.addTableToQueue();

  // add waiting queue cheking function
  }
  }
  sendContent() {
    this.content.emit('foodManue');
    this.activeTable.emit(this.booktableIds)
  }

   checkingAvailibilityOfTable(tables:any[])
   {
     tables.map((item)=>{
        if(item.capacity>=this.noOfCustomer && item.available ===true)
             {
             this,this.count= this.count+1;
             }
    })
    if(this.count>0)
    this.goForWaiting=false;
    else
    this.goForWaiting=true;

    console.log(this.goForWaiting);
    
   }

   goForWaitingWithManager():any
   {
    if(this.noOfCustomer>8)
    {
      this.goForWaitingToManager=true;
      return  true;
    }
    else false;
    
   }


  showTable()
  {
    this.service.showTable().subscribe({
      next:(res)=>{
        console.log(res);
        this.tableItems=res;
        this.checkingAvailibilityOfTable(res);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  addTableIds(id:string)
  {
    this.isActivte=id;
    this.toggleHighlight(id)
    this.showToggleChange(id)
    console.log(this.isActivte);
    console.log(this.isHighlighted);
    this.tableIds = [id]
    console.log(this.tableIds);
    this.previousActivte=id;
    
  }
  addNaTableIds(id:string)
  {
       this.isNaActivte=id;
       this.showNaToggleChange(id);
       this.toggleNaHighlight(id);
       this.naTableIds = [id];
       this.previousNa=id;

  }
 showToggleChange(id:string)
 {
  if(this.previousActivte===id )
  {
    this.showToggle=!this.showToggle;
    this.isNaHighlighted=false;
  }else
  {
    this.showToggle =true;
    this.showNaToggle=false;
    this.isNaHighlighted=false;
  }
  console.log(this.showToggle);

 }

 showNaToggleChange(id:string)
 {
  if(this.previousNa===id )
  {
    this.showNaToggle=!this.showNaToggle;
    this.isHighlighted=false;
  }else
  {
    this.showNaToggle =true;
    this.showToggle =false;
    this.isHighlighted=false;
  }
  console.log(this.showNaToggle);

 }

  toggleHighlight(id:string) {
    if(this.previousActivte===id )
    {
      this.isHighlighted = !this.isHighlighted;
    }else
    {
      this.isHighlighted =true;
      
    }
  }

    toggleNaHighlight(id:string) {
      if(this.previousNa===id )
      {
        this.isNaHighlighted = !this.isNaHighlighted;
      }else
      {
        this.isNaHighlighted =true;
        
      }

  }

  onToggle()
  {
    this.service.changeStatus(this.tableIds).subscribe({
      next:(res)=>{
            console.log(res);
            this.showTable();
            this.showToggle=false;
      },error:(err)=>{
          console.log(err);
          
      }
    });
  }
  onNaToggle()
  {
    this.service.changeStatus(this.naTableIds).subscribe({
      next:(res)=>{
            console.log(res);
            this.showNaToggle=false;
            this.showTable();
            
      },error:(err)=>{
          console.log(err);
          
      }
    });
  }

  tabelDelete()
  {
    this.service.deleteTable(this.isActivte).subscribe({
      next:(res)=>{
          console.log(res);
          this.showToggle= false;
          this.showTable();
          
      },error:(err)=>{
          console.log(err);
          
      }
    })

  }

  bookTable()
  {
    
    console.log(this.isActivte);
    this.booktableIds = [...this.booktableIds, this.isActivte];
    this.onToggle();
    this.sendContent();
    
  }


  //ashutosh ke changes

  showWaitingCount : any;
  displayMsg : string = '';
  interval : any;

  onClickOfFloatingIcon(){
    Swal.fire({
      title: 'Waiting Queue',
      html: this.displayMsg
    });
  }

  checkWaitingStatus(id:string){

    setInterval(()=>{
      this.interval = this.service.checkQueueForVacancy(id).subscribe({
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
            this.displayMsg = `Your table/s assigned are ${this.showWaitingCount}`;   
          }
        },
        error:(err)=>{
  
        }
      });
    },500)
  }

//Table not found: [3]

  clearCheckingWaitingStatus(){
    clearInterval(this.interval);
  }

  // yaha tak hai
  addTableToQueue()
  {
    this.toShowWaitingQueuLogo=true;
    this.service.addtoQueue(this.userid,this.noOfCustomer).subscribe({
      next:(res)=>{
        console.log(res);
        this.checkWaitingStatus(this.userid);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  

}
