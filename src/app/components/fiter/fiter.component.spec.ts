import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiterComponent } from './fiter.component';

describe('FiterComponent', () => {
  let component: FiterComponent;
  let fixture: ComponentFixture<FiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiterComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
