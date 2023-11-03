import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebesComponent } from './bebes.component';

describe('BebesComponent', () => {
  let component: BebesComponent;
  let fixture: ComponentFixture<BebesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BebesComponent]
    });
    fixture = TestBed.createComponent(BebesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
