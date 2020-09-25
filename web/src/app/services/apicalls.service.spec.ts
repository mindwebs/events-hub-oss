import { TestBed } from '@angular/core/testing';

import { ApicallsService } from './apicalls.service';

describe('ApicallsService', () => {
  let service: ApicallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApicallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
