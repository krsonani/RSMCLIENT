import { TestBed } from '@angular/core/testing';

import { CustomerupdateprofileService } from './customerupdateprofile.service';

describe('CustomerupdateprofileService', () => {
  let service: CustomerupdateprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerupdateprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
