import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  public set token(token: string) {
    localStorage.setItem('token', token);
  }

  public get token(): string {
    return localStorage.getItem('token') as string;
  }

  isTokenValid() {
    const token = this.token;

    if (!token) {
      return false;
    }

    const jwtHelpter = new JwtHelperService();

    const isTokenExpired = jwtHelpter.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }

    return true;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }
}
