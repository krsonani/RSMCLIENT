import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAssignTableComponent } from './manager-assign-table.component';

describe('ManagerAssignTableComponent', () => {
  let component: ManagerAssignTableComponent;
  let fixture: ComponentFixture<ManagerAssignTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerAssignTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerAssignTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
