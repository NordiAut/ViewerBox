import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectioncenterComponent } from './sectioncenter.component';

describe('SectioncenterComponent', () => {
  let component: SectioncenterComponent;
  let fixture: ComponentFixture<SectioncenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectioncenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectioncenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
