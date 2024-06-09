import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscriptionDetailComponent } from './suscription-detail.component';

describe('SuscriptionDetailComponent', () => {
  let component: SuscriptionDetailComponent;
  let fixture: ComponentFixture<SuscriptionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuscriptionDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuscriptionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
