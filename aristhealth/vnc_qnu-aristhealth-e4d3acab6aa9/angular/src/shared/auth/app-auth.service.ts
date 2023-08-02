import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { finalize, tap } from "rxjs/operators";
import { TokenService, LogService, UtilsService } from "abp-ng2-module";
import { AppConsts } from "@shared/AppConsts";
import { UrlHelper } from "@shared/helpers/UrlHelper";
import { RefreshTokenModel } from '../service-proxies/service-proxies';
import { Observable, Subject } from 'rxjs';
import {
  AuthenticateModel,
  AuthenticateResultModel,
  TokenAuthServiceProxy,
} from "@shared/service-proxies/service-proxies";

@Injectable()
export class AppAuthService{ 
  authenticateModel: AuthenticateModel;
  refreshTokenModel: RefreshTokenModel;
  authenticateResult: AuthenticateResultModel;
  rememberMe: boolean;

  constructor(
    private _tokenAuthService: TokenAuthServiceProxy,
    private _router: Router,
    private _utilsService: UtilsService,
    private _tokenService: TokenService,
    private _logService: LogService
  ) {
    this.clear();
  }

  logout(reload?: boolean): void {
    abp.auth.clearToken();
    abp.utils.deleteCookie(AppConsts.authorization.encryptedAuthTokenName);

    if (reload !== false) {
      location.href = AppConsts.appBaseUrl;
    }
  }

  authenticate(finallyCallback?: () => void): void {
    finallyCallback = finallyCallback || (() => { });

    this._tokenAuthService
        .authenticate(this.authenticateModel)
        .pipe(
            finalize(() => {
                finallyCallback();
            })
        )
        .subscribe((result: AuthenticateResultModel) => {
            this.processAuthenticateResult(result);
        });
}

  private processAuthenticateResult(
    authenticateResult: AuthenticateResultModel
  ) {
    this.authenticateResult = authenticateResult;

    if (authenticateResult.accessToken) {
      // Successfully logged in
      this.login(
        authenticateResult.accessToken,
        authenticateResult.refreshToken,
        authenticateResult.encryptedAccessToken,
        authenticateResult.expireInSeconds,
        this.rememberMe
      );
    } else {
      // Unexpected result!

      this._logService.warn("Unexpected authenticateResult!");
      this._router.navigate(["account/login"]);
    }
  }

  private login(
    accessToken: string,
    refreshToken: string,
    encryptedAccessToken: string,
    expireInSeconds: number,
    rememberMe?: boolean
  ): void {
    const tokenExpireDate = rememberMe
      ? new Date(new Date().getTime() + 1000 * expireInSeconds)
      : undefined;

    this._tokenService.setToken(accessToken, tokenExpireDate);
    this._tokenService.setRefreshToken(refreshToken, tokenExpireDate);
    this._utilsService.setCookieValue(
      AppConsts.authorization.encryptedAuthTokenName,
      encryptedAccessToken,
      tokenExpireDate,
      abp.appPath
    );

    let initialUrl = UrlHelper.initialUrl;
        if (initialUrl.indexOf('/login') > 0) {
      initialUrl = AppConsts.appBaseUrl;
    }

    location.href = initialUrl;
  }
  /**
   *
   * @param authenticateResult
   *
   */
  
  refreshAccessToken():  Observable<boolean> {
    let refreshModel: RefreshTokenModel = new RefreshTokenModel({
      accessToken : this._tokenService.getToken(),
      refreshToken: this._tokenService.getRefreshToken()
    })
    let refreshTokenObservable = new Subject<boolean>();
    this._tokenAuthService.refreshToken(refreshModel).subscribe(
      (tokenResult: AuthenticateResultModel) => {
        if (tokenResult && tokenResult.accessToken) {  
          this._tokenService.setRefreshToken(""+tokenResult.refreshToken);
          this._tokenService.setToken(""+tokenResult.accessToken);          
          this.processAuthenticateResult(tokenResult);
          refreshTokenObservable.next(true);
        } else {
          refreshTokenObservable.next(false);
        }
      },
      (error: any) => {
        refreshTokenObservable.next(false);
      }
    );;
      return refreshTokenObservable;
  }
  getToken(){
   return this._tokenService.getToken();
  }
  private clear(): void {
    this.authenticateModel = new AuthenticateModel();
    this.refreshTokenModel = new RefreshTokenModel();
    this.authenticateModel.rememberClient = false;
    this.authenticateResult = null;
    this.rememberMe = false;
  }
}
