import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomGuard } from './guards/room.guard';

const routes: Routes = [
  {
    path: '',
    component: RoomsComponent,
    children: [
      { path: 'add', component: RoomsAddComponent },
      // { path: ':roomId', component: RoomsBookingComponent },
    ],
    canActivateChild: [RoomGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule {}
