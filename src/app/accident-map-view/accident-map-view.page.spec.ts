import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentMapViewPage } from './accident-map-view.page';

describe('AccidentMapViewPage', () => {
  let component: AccidentMapViewPage;
  let fixture: ComponentFixture<AccidentMapViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentMapViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentMapViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
