import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoEnviosComponent } from './seguimiento-envios.component';

describe('SeguimientoEnviosComponent', () => {
  let component: SeguimientoEnviosComponent;
  let fixture: ComponentFixture<SeguimientoEnviosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimientoEnviosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguimientoEnviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
