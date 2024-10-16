import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesamientoPedidoComponent } from './procesamiento-pedido.component';

describe('ProcesamientoPedidoComponent', () => {
  let component: ProcesamientoPedidoComponent;
  let fixture: ComponentFixture<ProcesamientoPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesamientoPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesamientoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
