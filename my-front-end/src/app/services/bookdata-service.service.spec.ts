import { TestBed } from '@angular/core/testing';

import { BookdataServiceService } from './bookdata-service.service';

describe('BookdataServiceService', () => {
  let service: BookdataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookdataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
