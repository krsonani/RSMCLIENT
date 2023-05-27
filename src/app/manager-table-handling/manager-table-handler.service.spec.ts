import { TestBed } from '@angular/core/testing';

import { ManagerTableHandlerService } from './manager-table-handler.service';

describe('ManagerTableHandlerService', () => {
  let service: ManagerTableHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerTableHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
