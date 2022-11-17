import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public searchBorder:string = "solid";
  public bookingsBorder:string = "none";
  title = 'my-front-end';

  pressSearch(){
    this.searchBorder = "solid";
    this.bookingsBorder = "none";
  }

  pressBookings(){
    this.searchBorder = "none";
    this.bookingsBorder = "solid";
  }
}
