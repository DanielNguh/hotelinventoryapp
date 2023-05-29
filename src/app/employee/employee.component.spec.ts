import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeComponent } from './employee.component';
import { RoomsService } from '../rooms/services/rooms.service';
import { APP_CONFIG, APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { HttpClientModule } from '@angular/common/http';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeComponent ],
      imports: [HttpClientModule],
      providers: [RoomsService,
      {provide: APP_SERVICE_CONFIG,
      useValue: {apiEndpoint: 'http://localhost:3000' }}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
