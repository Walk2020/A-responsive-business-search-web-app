import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchPageComponent } from './components/search-page/search-page.component';
import { BookingComponent } from './components/booking/booking.component';

const routes: Routes = [
  {
    path:'search', component: SearchPageComponent
  },

  {
    path: 'bookings', component: BookingComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
