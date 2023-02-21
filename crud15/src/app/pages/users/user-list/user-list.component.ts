import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { listaTabla } from './interfase';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  constructor(private router: Router) { }

  listaTabla: listaTabla[] =

  [
    {
    id: 0,
    nombre: 'carolina',
    apellidos: 'maestre',
    email: '@carolina',
    sexo: 'mujer'
    },

    {
    id: 1,
    nombre: 'pedro',
    apellidos: 'castro',
    email: '@castro',
    sexo: 'hombre'
    },

  ]



  navegarLista(): void {
    console.log(this.navegarLista)
    this.router.navigate(['/users/edit'])
  }
}
