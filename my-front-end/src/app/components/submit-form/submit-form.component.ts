import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.css']
})
export class SubmitFormComponent implements OnInit {
  @ViewChild('cardComponent') cardComponent:any;
  public autoCheck: boolean = false;
  public yelpPara:any ={
    lat : "",
    lng : "",
    term : "",
    category : "",
    distance : ""
  };

  //just test!!!!
  public cardPara:any = {
    resultList : "",
    display : "none",
    resultNum: 0
  };

  public noResultDisplay:string = "none";

  //for autoComplete
  public submitFormKeyWordControl = new FormControl();
  public keywordOptions:any = {
    'term': "",
    'categories': ""
  };
  public isLoading: boolean = false;
  public errInfo!: string;
  public targetKeyword:string = "";




  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    this.submitFormKeyWordControl.valueChanges
      .pipe(
        filter(res=>{
          return res != null;
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(()=>{
          this.errInfo = "",
          this.keywordOptions = [];
          this.isLoading = true;
        }),
        switchMap(value=> this.http.get("http://localhost:8080/autocomplete?keyword=" + this.yelpPara.term)
          .pipe(
            finalize(()=>{
              this.isLoading = false;
            }),
          )
        )
      )
      .subscribe((data:any)=>{
        if(data == undefined){
          this.errInfo = data['Error'];
          this.keywordOptions = [];
        }
        else{
          this.errInfo = "";
          this.keywordOptions = data;
        }
      });
  }

  autoLocation(){
    this.autoCheck = ! this.autoCheck;
    let formDOM :any = document.getElementById("location");
    let checkboxDOM :any = document.getElementById("autoLocation");

    if(checkboxDOM.checked){
      formDOM.value=""; 
      formDOM.disabled = true;
      this.autoCheck = true;
    }
    else{
      formDOM.disabled = false;
      this.autoCheck = false;
    }
  }

  submitForm(){
    
    let formDOM :any = document.getElementById("myForm")
    if(!(formDOM.checkValidity())){
      return;
    }

    this.setParameter();

    if(!this.autoCheck){
      let locationDOM :any = document.getElementById("location");
      let geoKey :string = "";
      this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + locationDOM.value + "&key=" + geoKey).subscribe((response: any)=>{
        if(response.status == "ZERO_RESULTS"){
          ///no result found
          console.log("Oh No!!!")
          this.cardPara.display = "none";
          this.noResultDisplay = "flex";
          return;
        }
        else{
          this.yelpPara.lat = response.results[0].geometry.location.lat;
          this.yelpPara.lng = response.results[0].geometry.location.lng;

          console.log(this.yelpPara);
          this.callYelSearch(this.yelpPara);
          
        }
      })
    }
    else{
      let ipToken :string = "";
      this.http.get("https://ipinfo.io/?token=" + ipToken).subscribe((response: any)=>{
        let locArray :string[] = response.loc.split(",");
        this.yelpPara.lat = locArray[0];
        this.yelpPara.lng = locArray[1];

        console.log(this.yelpPara);
        this.callYelSearch(this.yelpPara);
      })

    }
  }

  setParameter() :void{
    let keywordDOM : any = document.getElementById('keyword');
    let distanceDOM : any = document.getElementById('distance');
    let categoryDOM : any = document.getElementById('category');
    this.yelpPara.term = keywordDOM.value;
    this.yelpPara.distance = distanceDOM.value;
    this.yelpPara.category = categoryDOM.value;
  }

  callYelSearch(params: any) :void{
    let url: string = 'http://localhost:8080/searchYelp?' + "lat=" + params.lat + "&lng=" + params.lng + "&term=" + params.term + "&category=" + params.category + "&distance=" + params.distance;

    this.http.get(url).subscribe((response: any)=>{
        console.log(response);
        if(response.total == 0){
          //get no result
          console.log("no result!!");
          this.cardPara.display = "none";
          this.noResultDisplay = "flex";
          return;
        }
        else{
          //gte some result
          this.makeResultTable(response.businesses);
        }
      })
  }

  makeResultTable(response:any){
    this.cardComponent.backToTable();
    //console.log(results);
    this.cardPara.resultNum = 20;
    this.cardPara.display = "flex",
    this.cardPara.resultList = response;
    this.noResultDisplay = "none";
  }

  reset(){
    this.cardComponent.resetValue();

    this.cardPara.display = "none";
    let keywordDOM : any = document.getElementById('keyword');
    let distanceDOM : any = document.getElementById('distance');
    let categoryDOM : any = document.getElementById('category');
    let locationDOM :any = document.getElementById("location");
    let checkboxDOM :any = document.getElementById("autoLocation");
    keywordDOM.value = "";
    distanceDOM.value = "";
    categoryDOM.selectedIndex = 0;

    locationDOM.value = "";
    locationDOM.disabled = false;
    this.autoCheck = false;

    checkboxDOM.checked = false;

    this.noResultDisplay = "none";

  }

  


  //for autoComplete
  onSelected(){
    this.targetKeyword = this.targetKeyword;
  }

  displayWith(value:any){
    return value;
  }

  

}
