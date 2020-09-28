import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GreenLightPage } from './green-light.page';

describe('GreenLightPage', () => {
  let component: GreenLightPage;
  let fixture: ComponentFixture<GreenLightPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenLightPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GreenLightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
