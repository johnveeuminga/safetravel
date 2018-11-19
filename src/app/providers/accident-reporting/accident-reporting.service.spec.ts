import { TestBed } from '@angular/core/testing';

import { AccidentReportingService } from './accident-reporting.service';

describe('AccidentReportingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccidentReportingService = TestBed.get(AccidentReportingService);
    expect(service).toBeTruthy();
  });
});
