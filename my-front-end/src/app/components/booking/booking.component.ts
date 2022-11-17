import { Component, OnInit } from '@angular/core';

import { BookdataServiceService } from 'src/app/services/bookdata-service.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  public reservationRecords:any[] = [];

  constructor(public bookData: BookdataServiceService) { }

  ngOnInit(): void {
    this.bookData.updateRecord();
  }

}
