import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartstatusComponent } from './cartstatus.component';

describe('CartstatusComponent', () => {
  let component: CartstatusComponent;
  let fixture: ComponentFixture<CartstatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartstatusComponent]
    });
    fixture = TestBed.createComponent(CartstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
