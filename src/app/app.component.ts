import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'hotelinventoryapp';
  role  = 'Admin'

  @ViewChild('name', {static: true}) name!: ElementRef;

  ngOnInit(): void {
    this.name.nativeElement.innerText = "Hi There, Life's short"
  }

  // @ViewChild('user', { read: ViewContainerRef}) vcr!: ViewContainerRef;

//   ngAfterViewInit(): void {
//     const componentRef = this.vcr.createComponent(RoomsComponent);
//     componentRef.instance.numberOfRooms = 30;
//   }
}
