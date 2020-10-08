import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgeviewerComponent } from './forgeviewer.component';

describe('ForgeviewerComponent', () => {
  let component: ForgeviewerComponent;
  let fixture: ComponentFixture<ForgeviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgeviewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgeviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
