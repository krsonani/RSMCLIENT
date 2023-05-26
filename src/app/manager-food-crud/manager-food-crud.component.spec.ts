import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerFoodCrudComponent } from './manager-food-crud.component';

describe('ManagerFoodCrudComponent', () => {
  let component: ManagerFoodCrudComponent;
  let fixture: ComponentFixture<ManagerFoodCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerFoodCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerFoodCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
