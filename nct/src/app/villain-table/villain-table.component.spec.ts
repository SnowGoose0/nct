import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillainTableComponent } from './villain-table.component';

describe('VillainTableComponent', () => {
  let component: VillainTableComponent;
  let fixture: ComponentFixture<VillainTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VillainTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VillainTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
