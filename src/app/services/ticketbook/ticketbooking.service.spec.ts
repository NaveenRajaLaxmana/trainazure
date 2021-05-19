import { TestBed } from '@angular/core/testing';

import { TicketbookingService } from './ticketbooking.service';

describe('TicketbookingService', () => {
  let service: TicketbookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketbookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
