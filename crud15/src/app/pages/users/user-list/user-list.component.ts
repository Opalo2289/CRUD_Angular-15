import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { atributosTablas} from '../../../common/interface/atributosTablas.interfase';
import { PlayersService } from 'src/app/services/players.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Player } from 'src/app/common/interface/player.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  


  //constructor(private playerService: PlayersService) //Forma tradicional de hacerlo
  _playerService = inject(PlayersService)//Nuevo metodo de injeccion de dependencias(se crea la variable y se hace el metodo)
  players$!: Observable<Player[]> //El signo de exclamacion asegura que va a tener un valor. Esta variable se crea para utilizar el ASYNC PIPE. {Esto esta asociado al casteo (return collectionData(q) as unknown as Observable<Player[]>) //Casteo de getPlayer en el players.service.ts}
  searcher = new FormControl('') //Esto es para hacer la busqueda y filtrar
  _router = inject(Router)


  ngOnInit(): void {
    
  //Esto va a estar escuchando al.
      this.players$ = this._playerService.getPlayer();//Esto lo pongo aqui para que lo inicie apenas carga la pagina
      this.searcher.valueChanges.subscribe((search)=> {
      if (search) {
        this.players$ = this._playerService.getPlayer(search); //Ir a Casteo del getPlayer en el servicio
      } else {
        this.players$ = this._playerService.getPlayer();
      }
    })
  }
  //this._playerService.getPlayer().subscribe((res)=> console.log(res)); //Esta forma implica tener que gestionar las desuscripciones



  editPlayer(player: Player) {
    this._router.navigateByUrl('users/edit')
  }

  deletePlayer(player: Player) {
    if(confirm(`Seguro de borrar a ${player.name}`)) {
    }
  }

  //El de agregar jugador se hará directamente en el html
}
