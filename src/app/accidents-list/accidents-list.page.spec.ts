import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentsListPage } from './accidents-list.page';

describe('AccidentsListPage', () => {
  let component: AccidentsListPage;
  let fixture: ComponentFixture<AccidentsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
