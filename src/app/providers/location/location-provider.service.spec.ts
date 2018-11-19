import { TestBed } from '@angular/core/testing';

import { LocationProviderService } from './location-provider.service';

describe('LocationProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationProviderService = TestBed.get(LocationProviderService);
    expect(service).toBeTruthy();
  });
});
