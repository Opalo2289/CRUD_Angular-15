import { Injectable } from '@angular/core';
import { collectionData, Firestore, where } from '@angular/fire/firestore'; //Esto es lo que nos permite conectarnos a las colescciones de firebase
import { addDoc, collection, query } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Player } from '../common/interface/player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private firestore: Firestore) { }

  //Se crea el interface dentro de common y se importa aqui
  addPlayer(player: Player) {
    const playerRef = collection(this.firestore, 'players');
    return addDoc(playerRef, player)//Agregar documentos a la colleccion de firebase(cada uno de los datos son documentos con la estructura que uno quiera, en este caso lo que esta en la interface)
  }

  //Esto lo vamos a usar para hacer el listado
  getPlayer(filter = '') {
    const playerRef = collection(this.firestore, 'players');
    let q = query(playerRef);
    if (filter) {
      q = query(playerRef, where('name','==', filter));
    }
    return collectionData(q) as unknown as Observable<Player[]> //Casteo de getPlayer{Esto esta asociado a Observable<Player[]> en el user-list.components.ts}
  }
}
