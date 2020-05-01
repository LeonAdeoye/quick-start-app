import { TestBed } from '@angular/core/testing';

import { PopupService } from '../services/popup.service';

describe('PopupService', () =>
{
  let service: PopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupService);
  });

  it('should be created', () =>
  {
    expect(service).toBeTruthy();
  });
});
