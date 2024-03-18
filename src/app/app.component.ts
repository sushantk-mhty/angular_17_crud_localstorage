import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Student } from './shared/student.model';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
 

  @ViewChild('myModal') modal :ElementRef | undefined;
  studentObj:Student=new Student();
  studentList:Student[]=[];

  ngOnInit(): void {
    const localData=localStorage.getItem("angular17crud");
    if(localData !=null){
      this.studentList=JSON.parse(localData);
    }
  }

  public openModal(){
    this.studentObj=new Student();
    const modal=document.getElementById("myModal");
    if(modal !=null){
     modal.style.display='block';
    }
  }
  public closeModal(){
    if(this.modal !=null){
      this.modal.nativeElement.style.display='none';
    }
  }
  public saveModal(){
    debugger;
      const isLocalPresent=localStorage.getItem("angular17crud");
      if(isLocalPresent !=null){
        
        const oldArray=JSON.parse(isLocalPresent); //converting string to array format
        this.studentObj.id=oldArray.length+1;
        oldArray.push(this.studentObj);
        this.studentList=oldArray;
        localStorage.setItem('angular17crud', JSON.stringify(oldArray)); //converting array to string
      }else{
        const newArr=[];
        newArr.push(this.studentObj);
        this.studentObj.id=1;
        this.studentList=newArr;
        localStorage.setItem('angular17crud', JSON.stringify(newArr)); //converting array to string
      } 
      this.closeModal();
  }
  public onEdit(sl:Student){
    this.openModal();
    this.studentObj=sl;
  }
  public updateModal(){
    const currentRecord=this.studentList.find(m=>m.id===this.studentObj.id);
    if(currentRecord !=undefined){
      currentRecord.name=this.studentObj.name;
      currentRecord.address=this.studentObj.address;
      currentRecord.mobileno=this.studentObj.mobileno;
      currentRecord.city=this.studentObj.city;
      currentRecord.state=this.studentObj.state;
      currentRecord.email=this.studentObj.email;
      currentRecord.pincode=this.studentObj.pincode;
    };
    localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    this.closeModal();
  }
  public onDelete(sl:Student){
    const isDelete=confirm("Are you sure want to delete");
    if(isDelete){
      const currentRecord=this.studentList.findIndex(m=>m.id===this.studentObj.id);
      this.studentList.splice(currentRecord,1);
      localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    }

  }
}
