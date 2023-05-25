import { TestBed } from '@angular/core/testing';

import { ManagerCategoryCrudService } from './manager-category-crud.service';

describe('ManagerCategoryCrudService', () => {
  let service: ManagerCategoryCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerCategoryCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
