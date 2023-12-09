import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedasComponent } from './busquedas.component';

describe('BusquedasComponent', () => {
  let component: BusquedasComponent;
  let fixture: ComponentFixture<BusquedasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedasComponent]
    });
    fixture = TestBed.createComponent(BusquedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
