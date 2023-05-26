import { TestBed } from '@angular/core/testing';

import { DaywiseorderService } from './daywiseorder.service';

describe('DaywiseorderService', () => {
  let service: DaywiseorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaywiseorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
