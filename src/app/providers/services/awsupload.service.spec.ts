import { TestBed } from '@angular/core/testing';

import { AwsuploadService } from './awsupload.service';

describe('AwsuploadService', () => {
  let service: AwsuploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsuploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
