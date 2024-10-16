import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEnviosComponent } from './gestion-envios.component';

describe('GestionEnviosComponent', () => {
  let component: GestionEnviosComponent;
  let fixture: ComponentFixture<GestionEnviosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionEnviosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEnviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
