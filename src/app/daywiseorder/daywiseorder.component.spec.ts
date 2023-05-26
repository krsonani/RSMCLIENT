import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaywiseorderComponent } from './daywiseorder.component';

describe('DaywiseorderComponent', () => {
  let component: DaywiseorderComponent;
  let fixture: ComponentFixture<DaywiseorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaywiseorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaywiseorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
