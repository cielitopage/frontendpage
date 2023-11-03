import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChicasComponent } from './chicas.component';

describe('ChicasComponent', () => {
  let component: ChicasComponent;
  let fixture: ComponentFixture<ChicasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChicasComponent]
    });
    fixture = TestBed.createComponent(ChicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
