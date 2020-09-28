import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrScannerPage } from './qr-scanner.page';

describe('QrScannerPage', () => {
  let component: QrScannerPage;
  let fixture: ComponentFixture<QrScannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrScannerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrScannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
