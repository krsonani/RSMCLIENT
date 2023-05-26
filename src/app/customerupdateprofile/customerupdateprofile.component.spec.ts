import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerupdateprofileComponent } from './customerupdateprofile.component';

describe('CustomerupdateprofileComponent', () => {
  let component: CustomerupdateprofileComponent;
  let fixture: ComponentFixture<CustomerupdateprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerupdateprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerupdateprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
