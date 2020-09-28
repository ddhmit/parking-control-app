import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoAuditPage } from './info-audit.page';

describe('InfoAuditPage', () => {
  let component: InfoAuditPage;
  let fixture: ComponentFixture<InfoAuditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAuditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoAuditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
