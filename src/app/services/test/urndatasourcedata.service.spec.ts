import { TestBed } from '@angular/core/testing';

import { UrndatasourcedataService } from '../urndatasourcedata.service';

describe('UrndatasourcedataService', () => {
  let service: UrndatasourcedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrndatasourcedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
