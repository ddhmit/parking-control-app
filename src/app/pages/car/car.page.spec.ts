import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarPage } from './car.page';

describe('CarPage', () => {
  let component: CarPage;
  let fixture: ComponentFixture<CarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
