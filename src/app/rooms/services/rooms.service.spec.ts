import { TestBed } from '@angular/core/testing';

import { RoomsService } from './rooms.service';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.service';

describe('RoomsService', () => {
  let service: RoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: APP_SERVICE_CONFIG }],
    });
    service = TestBed.inject(RoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
