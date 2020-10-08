import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionrightComponent } from './sectionright.component';

describe('SectionrightComponent', () => {
  let component: SectionrightComponent;
  let fixture: ComponentFixture<SectionrightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionrightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionrightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
