import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookdataServiceService {

  public reservationRecords:any[] = [];



  constructor() { }

  addRecord(key:string, record:any){
    //this.reservationRecords.push(record);
    localStorage.setItem(key, JSON.stringify(record));
    this.updateRecord()

  }

  removeRecord(key:string){
    alert("Reservation canceled!");
    localStorage.removeItem(key);
    this.updateRecord()
  }

  checkIfExist(key:string) : boolean{
    var length = this.reservationRecords.length;
    for (var i = 0; i < length; i++) {
      if(this.reservationRecords[i].id == key){
        return true;
      }
    }
    return false;

  }

  isEmpty(){
    if(this.reservationRecords.length == 0){
      return true;
    }
    else{
      return false;
    }
  }

  updateRecord(){

    var records: any[] = [];
    var keys = Object.keys(localStorage);
    var key;

    for (var i = 0; key = keys[i]; i++) {
      records.push(JSON.parse(localStorage.getItem(key)!));
    }
    this.reservationRecords = records;

  }

}
