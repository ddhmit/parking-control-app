import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from './services/store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router, private storeService: StoreService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.storeService.getObject('user').then(async (user) => {
      if (user && user.accessToken) {
        const { identity } = user;
        const allFalse = Object.values(identity).every((item) => !item);
        // 如果当前账号是新账号
        if (allFalse) {
          this.router.navigate(['/info-audit']);
          return false;
        }
        // 如果当前账号是 商户责任人
        if (identity['商户责任人']) {
          const merchant = await this.storeService.getObject('merchant');
          console.log(merchant);
          if (!merchant || merchant.status != '正常') {
            this.router.navigate(['/info-audit']);
            return false;
          }
        }
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    });
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
