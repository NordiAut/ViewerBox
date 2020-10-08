import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentcenterComponent } from './contentcenter.component';

describe('ContentcenterComponent', () => {
  let component: ContentcenterComponent;
  let fixture: ComponentFixture<ContentcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentcenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
