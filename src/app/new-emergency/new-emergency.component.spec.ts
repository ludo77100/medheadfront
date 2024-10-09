import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmergencyComponent } from './new-emergency.component';

describe('NewEmergencyComponent', () => {
  let component: NewEmergencyComponent;
  let fixture: ComponentFixture<NewEmergencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEmergencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
