import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Player } from 'src/app/common/interface/player.interface';
import { PlayersService } from 'src/app/services/players.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  
  _playerService = inject(PlayersService);
  _router = inject(Router)
  _location = inject(Location) //servicio que Angular ofrece para conocer el estado de una ruta. viene de Angular common
  player!: Player; // Esto es para obtener el player (en ngOnInit)
  form = new FormGroup (
    {
      name: new FormControl('', Validators.required),
      decks: new FormArray([]),
    }
  );

 ngOnInit(): void {
    console.log(this._location.getState());
    this.player = (this._location.getState() as any).player;
    if (this.player) this.setCurrentPlayer(this.player)
  }

  get decks() {
    return (this.form.get('decks')as FormArray).controls
  }

  createDeck() {
    (this.form.get('decks') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        cards: new FormControl(null, Validators.required) //Null porque va estar ligado a numeros no ha cadenas 
      })
    );
  }


  /*
    *Esto es para llenar los datos en el formulario

    Esta nueva funcion es para no recargar el ngOnInit y poder que cuando
    le demos a editar no solo cargue el pathValue del nombre si no de los decks tambien. 
  */
 setCurrentPlayer(player: any) {
  this.form.patchValue(this.player as any); //Lo que hace es comprar un objeto que tenga la misma estructura que el formGrup y ponerle los nombres que coinciden
  player.decks.map((deck: any) => { //map porque es un array
    const deckForm = new FormGroup({
      name: new FormControl(deck.name),
      cards: new FormControl(deck.cards),//Aaqui tenemos un formulario por cada deck
    });
    (this.form.get('decks') as FormArray).push(deckForm)
  })
 }

 //Ahora vamos a consumir el servicio updatePlayer que viene del playerService
 updatePlayer() {
  this. _playerService.updatePlayer({
    id: this.player.id, //Esto es debido a que el formulario no esta almacenando el id
    ...this.form.getRawValue(),
  } as Player);
  this._router.navigate(['users']);
 }
};


/**
 * *HAY DOS OPCIONES PARA HACER EL ENVIO DE LA DATA (EL OBJETO DEL PLAYER) A LA RUTA EDIT
 ** 1. Se manda el objeto a la ruta o..(se utiliza esta en este ejemplo) para esto nos vamos a editPlayer() y hacemos uso de un state
 * 2. Se manda un identificador a la barra de URls y al inicio del componente se hace una consulta firebase para saber los datos y luego utilizarlos
 */