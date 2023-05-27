import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTableHandlingComponent } from './manager-table-handling.component';

describe('ManagerTableHandlingComponent', () => {
  let component: ManagerTableHandlingComponent;
  let fixture: ComponentFixture<ManagerTableHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerTableHandlingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerTableHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
