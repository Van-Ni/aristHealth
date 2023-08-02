/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyRefreshTokenService } from './my-refresh-token.service';

describe('Service: MyRefreshToken', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyRefreshTokenService]
    });
  });

  it('should ...', inject([MyRefreshTokenService], (service: MyRefreshTokenService) => {
    expect(service).toBeTruthy();
  }));
});
