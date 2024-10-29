import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, // Asegura que el componente se maneje como independiente
  imports: [CommonModule] // Importar CommonModule directamente
}) 

export class AppComponent implements AfterViewInit {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  cardError: string = ''; // Asegúrate de que esto esté presente
  card: any;

  ngAfterViewInit() {
    // Código para ejecutar después de que la vista se inicialice
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.onChange);
  }

  onChange($event){

  }

}
