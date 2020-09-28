import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MerchantInfoPage } from './merchant-info.page';

describe('MerchantInfoPage', () => {
  let component: MerchantInfoPage;
  let fixture: ComponentFixture<MerchantInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MerchantInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
