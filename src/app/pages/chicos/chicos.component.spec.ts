import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChicosComponent } from './chicos.component';

describe('ChicosComponent', () => {
  let component: ChicosComponent;
  let fixture: ComponentFixture<ChicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChicosComponent]
    });
    fixture = TestBed.createComponent(ChicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
