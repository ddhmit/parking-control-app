import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RechargePage } from './recharge.page';

describe('RechargePage', () => {
  let component: RechargePage;
  let fixture: ComponentFixture<RechargePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RechargePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
