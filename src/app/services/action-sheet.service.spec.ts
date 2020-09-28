import { TestBed } from '@angular/core/testing';

import { ActionSheetService } from './action-sheet.service';

describe('ActionSheetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionSheetService = TestBed.get(ActionSheetService);
    expect(service).toBeTruthy();
  });
});
