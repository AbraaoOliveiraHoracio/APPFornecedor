import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  opcaoPacto: string | undefined;

  aceitarPacto: boolean = false;




  obterInformacoes() {

    console.log('Opção de pacto selecionada:', this.opcaoPacto);

    console.log('Checkbox aceito:', this.aceitarPacto);

  }
}
