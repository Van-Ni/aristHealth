import { Injectable } from '@angular/core';
import { RefreshTokenService } from 'abp-ng2-module';
import { Observable } from 'rxjs';
import { AppAuthService } from './app-auth.service';

@Injectable({
  providedIn: 'root'
})
export class MyRefreshTokenService implements RefreshTokenService {

constructor(private appAuthService: AppAuthService) { 


}
  tryAuthWithRefreshToken(): Observable<boolean> {
   return this.appAuthService.refreshAccessToken();
  }

}
