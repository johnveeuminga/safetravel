import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteponePage } from './stepone.page';

describe('SteponePage', () => {
  let component: SteponePage;
  let fixture: ComponentFixture<SteponePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteponePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteponePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
