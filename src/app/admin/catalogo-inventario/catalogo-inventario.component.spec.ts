import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoInventarioComponent } from './catalogo-inventario.component';

describe('CatalogoInventarioComponent', () => {
  let component: CatalogoInventarioComponent;
  let fixture: ComponentFixture<CatalogoInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoInventarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
