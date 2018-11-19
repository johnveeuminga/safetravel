import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooselocationPage } from './chooselocation.page';

describe('ChooselocationPage', () => {
  let component: ChooselocationPage;
  let fixture: ComponentFixture<ChooselocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooselocationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooselocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
