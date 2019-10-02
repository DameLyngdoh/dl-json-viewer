import { TestBed } from '@angular/core/testing';

import { DlJsonViewerService } from './dl-json-viewer.service';

describe('DlJsonViewerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DlJsonViewerService = TestBed.get(DlJsonViewerService);
    expect(service).toBeTruthy();
  });
});
