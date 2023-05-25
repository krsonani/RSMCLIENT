import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCategoryCrudComponent } from './manager-category-crud.component';

describe('ManagerCategoryCrudComponent', () => {
  let component: ManagerCategoryCrudComponent;
  let fixture: ComponentFixture<ManagerCategoryCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerCategoryCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerCategoryCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
