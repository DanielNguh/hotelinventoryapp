import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'rooms',
    loadChildren: () =>
      import('./rooms/rooms.module').then((m) => m.RoomsModule),
    canActivate: [LoginGuard], canLoad: [LoginGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'booking/:roomid',
    loadChildren: () =>
      import('./booking/booking.module').then((m) => m.BookingModule),
    // canActivate: [LoginGuard],
  },
  { path: 'comments', loadChildren: () => import('./comments/comments.module').then(m => m.CommentsModule) },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
