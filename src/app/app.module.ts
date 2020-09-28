import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonAffixModule } from 'ion-affix';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalErrorHandler } from './global-error-handler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { GreenLightPageModule } from './pages/green-light/green-light.module';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { DefaultInterceptor } from './default-interceptor';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Downloader } from '@ionic-native/downloader/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    IonAffixModule,
    GreenLightPageModule,
  ],
  providers: [
    StatusBar,
    FileTransfer,
    QRScanner,
    SplashScreen,
    GlobalErrorHandler,
    File,
    Downloader,
    FileOpener,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    [{ provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true }],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
