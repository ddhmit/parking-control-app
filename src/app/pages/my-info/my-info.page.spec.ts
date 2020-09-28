import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyInfoPage } from './my-info.page';

describe('MyInfoPage', () => {
  let component: MyInfoPage;
  let fixture: ComponentFixture<MyInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
