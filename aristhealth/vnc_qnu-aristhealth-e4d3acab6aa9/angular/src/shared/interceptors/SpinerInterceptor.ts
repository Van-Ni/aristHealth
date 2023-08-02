import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../app/services/loader/loading.service';
import { Injectable } from '@angular/core';
@Injectable()
export  class SpinerInterceptor implements HttpInterceptor{
    private totalRequests = 0;

    constructor(
      private loadingService: LoadingService
    ) {
    }
  
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      console.log('caught')
      this.totalRequests++;
      this.loadingService.setLoading(true);
      
      return next.handle(request).pipe(
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests == 0) {
            this.loadingService.setLoading(false);
            console.log('Set false')
          }
        })
      );
    }
}