import { TestBed } from '@angular/core/testing';

import { MysecondserviceService } from './mysecondservice.service';

describe('MysecondserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MysecondserviceService = TestBed.get(MysecondserviceService);
    expect(service).toBeTruthy();
  });
});
