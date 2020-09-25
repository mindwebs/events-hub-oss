import { TestBed } from '@angular/core/testing';

import { ApiAdmincallsService } from './api-admincalls.service';

describe('ApiAdmincallsService', () => {
  let service: ApiAdmincallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAdmincallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
