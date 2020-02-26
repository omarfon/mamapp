import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecalcComponent } from './recalc.component';

describe('RecalcComponent', () => {
  let component: RecalcComponent;
  let fixture: ComponentFixture<RecalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecalcComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
