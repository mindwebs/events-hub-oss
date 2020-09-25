import { TestBed } from '@angular/core/testing';

import { VarsService } from './vars.service';

describe('VarsService', () => {
  let service: VarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
