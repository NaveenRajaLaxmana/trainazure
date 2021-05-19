import { TestBed } from '@angular/core/testing';

import { GetalltrainsService } from './getalltrains.service';

describe('GetalltrainsService', () => {
  let service: GetalltrainsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetalltrainsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
