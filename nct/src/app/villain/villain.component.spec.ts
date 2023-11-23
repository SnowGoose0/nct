import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillainComponent } from './villain.component';

describe('VillainComponent', () => {
  let component: VillainComponent;
  let fixture: ComponentFixture<VillainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VillainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VillainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
