import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablengprimeComponent } from './tablengprime.component';

describe('TablengprimeComponent', () => {
  let component: TablengprimeComponent;
  let fixture: ComponentFixture<TablengprimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablengprimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablengprimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
