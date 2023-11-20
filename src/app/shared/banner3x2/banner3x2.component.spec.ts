import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Banner3x2Component } from './banner3x2.component';

describe('Banner3x2Component', () => {
  let component: Banner3x2Component;
  let fixture: ComponentFixture<Banner3x2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Banner3x2Component]
    });
    fixture = TestBed.createComponent(Banner3x2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
