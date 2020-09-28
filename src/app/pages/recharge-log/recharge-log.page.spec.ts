import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RechargeLogPage } from './recharge-log.page';

describe('RechargeLogPage', () => {
  let component: RechargeLogPage;
  let fixture: ComponentFixture<RechargeLogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargeLogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RechargeLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
