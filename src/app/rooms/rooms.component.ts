import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, of, map } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent
  implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy
{
  selectedRoom!: RoomList;
  hotelName = 'Akwa Palace Hotel';
  numberOfRooms = 10;
  hideRooms = true;
  rooms: Room = {
    availableRooms: 10,
    bookedRooms: 5,
    totalRooms: 20,
  };
  roomList: RoomList[] = [];

  title: string = 'Room List';

  stream = new Observable((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
  });

  totalBytes: number = 0;

  subscription!: Subscription;

  error$ = new Subject<string>;

  getError$ = this.error$.asObservable();

  room$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms) => rooms.length)
  );

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;

  constructor(private roomsService: RoomsService, private config: ConfigService) {}

  ngOnInit(): void {
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been sent!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
        }
      }
    });
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete!'),
      error: (err) => console.log(err),
    });
    // this.subscription = this.roomsService.getRooms$.subscribe((rooms) => {
    //   this.roomList = rooms;
    // });
  }

  // ngDoCheck(): void {
  //   console.log("On changes is called");

  // }
  ngAfterViewInit(): void {
    this.headerComponent.title = 'Rooms View';
    this.headerChildrenComponent.forEach((element) => {
      element.title = 'Testing All';
    });
  }

  ngAfterViewChecked(): void {}

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
    console.log(room);
  }

  addRoom() {
    const room: RoomList = {
      // roomNumber: (this.roomList.length + 1).toString(),
      roomType: 'Apartment',
      amenities: 'Air conditioner, Wi-Fi, Free parking, TV, Bathroom, Kitchen',
      price: 160000,
      photos: '../../assets/images/DSC_0813.JPG',
      checkinTime: new Date('14-May-2023'),
      checkoutTime: new Date('16-May-2023'),
      rating: parseFloat(Math.random().toFixed(2)) + 4,
    };

    // this.roomList = [...this.roomList, room];
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Apartment',
      amenities: 'Air conditioner, Wi-Fi, Free parking, TV, Bathroom, Kitchen',
      price: 170000,
      photos: '../../assets/images/DSC_0813.JPG',
      checkinTime: new Date('14-May-2023'),
      checkoutTime: new Date('16-May-2023'),
      rating: parseFloat(Math.random().toFixed(2)) + 4,
    };
    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.deleteRoom('3').subscribe((data) => {
      this.roomList = data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
