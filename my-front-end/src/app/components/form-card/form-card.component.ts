import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getCurrencySymbol } from '@angular/common';
import { BookdataServiceService } from 'src/app/services/bookdata-service.service';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.css']
})
export class FormCardComponent implements OnInit {
  @Input() cardPara : any;
  @ViewChild("closeBtn") closeButton :any;

  public yelpIcon:string = "assets/images/yelp_icon.jpg"
  public tableDisplay : string = "flex"; 
  public detailCardDisplay :string = "none";
  public TabIndex:number = 0;
  public detailPara:any = {
    name:"",
    address: "",
    phone:"",
    status:"",
    category:"",
    price:"",
    yelpLink:"",
    photos:"",
    mapOptions:"",
    reviews:"",
    id: ""
  };

  public today:string = "";

  
  

  constructor(public http: HttpClient, public bookData: BookdataServiceService) { }

  ngOnInit(): void {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.today = yyyy + "-" + mm + "-" + dd;
    console.log(this.today);
  }

  getDetail(id:string){
    let url: string = 'http://localhost:8080/detail?' + "id=" + id;
    this.http.get(url).subscribe((response: any)=>{
      this.detailPara.id = id;
      this.generateDetailCard(response);

      let reviewUrl: string = 'http://localhost:8080/review?' + "id=" + id;
      this.http.get(reviewUrl).subscribe((reviewResponse: any)=>{
        this.detailPara.reviews = reviewResponse.reviews;
        console.log(this.detailPara);
      })


    })
  }

  generateDetailCard(data:any){
    this.tableDisplay = "none";
    this.detailCardDisplay = "block";

    this.detailPara.name = data.name;
    let address:string = data.location.display_address[0];
    for(var index = 1; index < data.location.display_address.length; index++){
      address = address + ", " + data.location.display_address[index];
    }
    this.detailPara.address = address;
    this.detailPara.phone = data.display_phone;
    this.detailPara.status = data.hours[0].is_open_now;
    
    let category:string = data.categories[0].title;
    for(var index = 1; index < data.categories.length; index++){
      category = category + " | " + data.categories[index].title;
    }
    this.detailPara.category = category;
    this.detailPara.price = data.price;
    this.detailPara.yelpLink = data.url;
    this.detailPara.photos = data.photos;

    this.detailPara.mapOptions = {
      center: { lat: data.coordinates.latitude, lng: data.coordinates.longitude },
      zoom : 17
    };
  }


  shareOnTwitter() {
    let navUrl ="https://twitter.com/intent/tweet?text=" + "Check " + this.detailPara.name + " on Yelp. \n" + this.detailPara.yelpLink;
    window.open(navUrl, '_blank');
  }

  shareOnFacebook(){
    let fbnavUrl = "https://www.facebook.com/sharer/sharer.php?u=" + this.detailPara.yelpLink;
    window.open(fbnavUrl , '_blank');
  }

  backToTable(){
    this.tableDisplay = "flex"; 
    this.detailCardDisplay = "none";
    this.TabIndex = 0;

  }

  submitReserve(){

        // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
      'use strict'

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.from(forms).forEach((form:any) => {
        form.addEventListener('submit', (event:any) => {

          let emailDOM:any = document.getElementById("emailInput");
          let emailHintDOM: any = document.getElementById("emailHint");
          if(emailDOM.value == ""){
            emailHintDOM.innerHTML = "Email is required";
          }
          else{
            emailHintDOM.innerHTML = "Email must be a valid email address";
          }

          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          
          if(form.checkValidity())
          {
            this.addReservation();
            alert("Reservation created!");
            this.closeButton.nativeElement.click();
            event.stopImmediatePropagation();
          }

          form.classList.add('was-validated')
        }, false)
      })
    })()

  }

  addReservation(){
    let emailInputDOM :any = document.getElementById("emailInput");
    let dateDOM :any = document.getElementById("date");
    let hourDOM :any = document.getElementById("hour");
    let minuteDOM :any = document.getElementById("minute");

    let key:string = this.detailPara.id;

    let record = {
      id : key,
      businessName : this.detailPara.name,
      date : dateDOM.value,
      time: hourDOM.value + ":" + minuteDOM.value,
      email : emailInputDOM.value
    };

    this.bookData.addRecord(key, record);
    //console.log(this.bookData.reservationRecords);

  }



  resetValue(){
    let emailInputDOM :any = document.getElementById("emailInput");
    let dateDOM :any = document.getElementById("date");
    let hourDOM :any = document.getElementById("hour");
    let minuteDOM :any = document.getElementById("minute");

    emailInputDOM.value = "";
    dateDOM.value = null;
    hourDOM.selectedIndex = 0;
    minuteDOM.selectedIndex = 0;

  }



  

}
