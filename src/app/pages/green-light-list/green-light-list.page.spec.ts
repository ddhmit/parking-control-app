import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GreenLightListPage } from './green-light-list.page';

describe('GreenLightListPage', () => {
  let component: GreenLightListPage;
  let fixture: ComponentFixture<GreenLightListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenLightListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GreenLightListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
