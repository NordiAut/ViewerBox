import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionleftComponent } from './sectionleft.component';

describe('SectionleftComponent', () => {
  let component: SectionleftComponent;
  let fixture: ComponentFixture<SectionleftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionleftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionleftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
