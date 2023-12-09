import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedasresultComponent } from './busquedasresult.component';

describe('BusquedasresultComponent', () => {
  let component: BusquedasresultComponent;
  let fixture: ComponentFixture<BusquedasresultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedasresultComponent]
    });
    fixture = TestBed.createComponent(BusquedasresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
