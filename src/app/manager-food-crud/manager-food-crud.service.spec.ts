import { TestBed } from '@angular/core/testing';

import { ManagerFoodCrudService } from './manager-food-crud.service';

describe('ManagerFoodCrudService', () => {
  let service: ManagerFoodCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerFoodCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
