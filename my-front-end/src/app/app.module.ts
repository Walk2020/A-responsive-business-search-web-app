import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';

//autocomplete
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SubmitFormComponent } from './components/submit-form/submit-form.component';
import { FormCardComponent } from './components/form-card/form-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingComponent } from './components/booking/booking.component';

import { BookdataServiceService } from './services/bookdata-service.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    SubmitFormComponent,
    FormCardComponent,
    BookingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [BookdataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
