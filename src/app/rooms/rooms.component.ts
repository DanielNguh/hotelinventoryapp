import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChild, ViewChildren
} from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, AfterViewInit, AfterViewChecked {
  selectedRoom!: RoomList;
  hotelName = 'Akwa Palace Hotel';
  numberOfRooms = 10;
  hideRooms = false;
  rooms: Room = {
    availableRooms: 10,
    bookedRooms: 5,
    totalRooms: 20,
  };
  roomList: RoomList[] = [];

  title: string = 'Room List';

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  constructor() {}

  ngOnInit(): void {
    this.roomList = [
      {
        roomNumber: 1,
        roomType: 'Deluxe Room',
        amenities:
          'Air conditioner, Wi-Fi, Free parking, TV, Bathroom, Kitchen',
        price: 50000,
        photos: '../../assets/images/DSC_0813.JPG',
        checkinTime: new Date('8-May-2023'),
        checkoutTime: new Date('9-May-2023'),
        rating: 3.2,
      },
      {
        roomNumber: 2,
        roomType: 'Premium Suite',
        amenities:
          'Air conditioner, Wi-Fi, Free parking, TV, Bathroom, Kitchen',
        price: 100000,
        photos: '../../assets/images/DSC_0817.JPG',
        checkinTime: new Date('8-May-2023'),
        checkoutTime: new Date('9-May-2023'),
        rating: 1.9,
      },
      {
        roomNumber: 3,
        roomType: 'Master Suite',
        amenities:
          'Air conditioner, Wi-Fi, Free parking, TV, Bathroom, Kitchen',
        price: 150000,
        photos: '../../assets/images/DSC_0852.JPG',
        checkinTime: new Date('12-May-2023'),
        checkoutTime: new Date('15-May-2023'),
        rating: 4.5,
      },
    ];
  }

  // ngDoCheck(): void {
  //   console.log("On changes is called");

  // }
  ngAfterViewInit(): void {
    this.headerComponent.title = "Rooms View";
    this.headerChildrenComponent.forEach((element) => {
       element.title= "Testing All";
    })

  }

  ngAfterViewChecked(): void {

  }

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
      roomNumber: this.roomList.length + 1,
      roomType: 'Apartment',
      amenities: 'Air conditioner, Wi-Fi, Free parking, TV, Bathroom, Kitchen',
      price: 160000,
      photos: '../../assets/images/DSC_0813.JPG',
      checkinTime: new Date('14-May-2023'),
      checkoutTime: new Date('16-May-2023'),
      rating: parseFloat(Math.random().toFixed(2)) + 4,
    };

    this.roomList = [...this.roomList, room];
  }
}
