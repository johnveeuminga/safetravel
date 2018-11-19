import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepthreePage } from './stepthree.page';

describe('StepthreePage', () => {
  let component: StepthreePage;
  let fixture: ComponentFixture<StepthreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepthreePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepthreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
