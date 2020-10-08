import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgesourcesComponent } from './forgesources.component';

describe('ForgesourcesComponent', () => {
  let component: ForgesourcesComponent;
  let fixture: ComponentFixture<ForgesourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgesourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgesourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
