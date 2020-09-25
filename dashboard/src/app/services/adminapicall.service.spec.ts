import { TestBed } from '@angular/core/testing';

import { AdminapicallService } from './adminapicall.service';

describe('AdminapicallService', () => {
  let service: AdminapicallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminapicallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
