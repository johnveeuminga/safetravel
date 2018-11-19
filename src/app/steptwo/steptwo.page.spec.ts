import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteptwoPage } from './steptwo.page';

describe('SteptwoPage', () => {
  let component: SteptwoPage;
  let fixture: ComponentFixture<SteptwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteptwoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteptwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
