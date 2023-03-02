import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayersService } from 'src/app/services/players.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Player } from 'src/app/common/interface/player.interface';
@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {
  _playerService = inject(PlayersService)
  _rooter = inject(Router)

  form = new FormGroup (
    {
      name: new FormControl('', Validators.required),
      decks: new FormArray([]),
    }
  );

  get decks() {
    return(this.form.get('decks') as FormArray).controls //Castear como un formArray (esta devolviendo los controles del formulario "decks") el template de angular suele tener problemas identificando este tipo de funcionalidades dentro de un ngfor
    //En un inicio el 'decks' estará vacio
  }

  createDeck() {
    (this.form.get('decks') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        cards: new FormControl(null, Validators.required) //Null porque va estar ligado a numeros no ha cadenas 
      })
    )
  }

  addplayer() {
    /*
    *this._playerService.addPlayer(this.form.getRawValue())
    Esto puede funcionar, el problema es que nuestra interface de player tiene un ID
    el cual no se esta pidiendo en los input dentro del formulario, el ID lo vamos a generar de manera manual obteniendo la fecha actual
    */

    this._playerService.addPlayer({
      id: new Date().getTime().toString(),
      ...this.form.getRawValue(),
    }as Player);
    this._rooter.navigate(['users'])
  }
}