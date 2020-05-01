import { TestBed } from '@angular/core/testing';

import { LoggingService } from '../services/logging.service';

describe('LoggingService', () =>
{
  let service: LoggingService;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingService);
  });

  it('should be created', () =>
  {
    expect(service).toBeTruthy();
  });
});
