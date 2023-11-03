import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanneroffComponent } from './banneroff.component';

describe('BanneroffComponent', () => {
  let component: BanneroffComponent;
  let fixture: ComponentFixture<BanneroffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BanneroffComponent]
    });
    fixture = TestBed.createComponent(BanneroffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
