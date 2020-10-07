import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerboxComponent } from './viewerbox.component';

describe('ViewerboxComponent', () => {
  let component: ViewerboxComponent;
  let fixture: ComponentFixture<ViewerboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewerboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
