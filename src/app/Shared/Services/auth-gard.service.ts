import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'Shared/Services/auth.service';

import { LocalstorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private route: Router,
    private localStorage: LocalstorageService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}
  canActivate() {
    if (isPlatformBrowser(this.platformId)) {
      let token = this.localStorage.getItem('token');
      console.log(`is browser ${isPlatformBrowser(this.platformId)}`);
      console.log('token', token);
      if (token) {
        return true;
      } else {
        this.route.navigate(['/Login']);
        return false;
      }
    } else return true;
  }
}
