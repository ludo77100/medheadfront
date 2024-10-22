import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;
  const tokenKey = 'auth-token';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should save token in sessionStorage', () => {
    const testToken = 'test-token';
    service.saveToken(testToken);
    expect(sessionStorage.getItem(tokenKey)).toBe(testToken);
  });

  it('should remove token and user from sessionStorage on signOut', () => {
    sessionStorage.setItem(tokenKey, 'test-token');
    
    service.signOut();
    
    expect(sessionStorage.getItem(tokenKey)).toBeNull();
  });

});
