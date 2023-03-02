import { Injectable } from '@angular/core';
import { collectionData, Firestore, getDocs, updateDoc, where, doc, deleteDoc } from '@angular/fire/firestore'; //Esto es lo que nos permite conectarnos a las colescciones de firebase
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
  };

  //Esto lo vamos a usar para hacer el listado
  getPlayer(filter = '') {
    const playerRef = collection(this.firestore, 'players');
    let q = query(playerRef);
    if (filter) {
      q = query(playerRef, where('name', '==', filter));
    }
    return collectionData(q) as unknown as Observable<Player[]> //Casteo de getPlayer{Esto esta asociado a Observable<Player[]> en el user-list.components.ts}
  }

  //Edit Player
  async updatePlayer(player: Player) {
    const playerRef = collection(this.firestore, 'players') //Referencia a la coleccion
    let q = query(playerRef, where('id', '==', player.id)); //Comparacion para poder identificar
    const querySnapshot = await getDocs(q); //El q lo vamos a almacenar dentro la funcion querySnapshot// La funcion getDocs devuelve una promesa//se convierte la funcion en async y despues se trabaja sobre lo que se espera

    querySnapshot.forEach(async (document) => { //Se hace un forEach por cada uno de los documentos que vengan
      const docRef = doc(this.firestore, 'players', document.id); //El docRef es el que se va a actualizar
      await updateDoc(docRef, { ...player }); //Se coloca await porque es una promesa del updateDoc (el ...player sera el objeto actualizado, se acualiza con un async ) 
    });
  };


  async deletePlayer(id: string) {
    const playerRef = collection(this.firestore, 'players');
    let q = query(playerRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => { //Se hace un forEach por cada uno de los documentos que vengan
      const docRef = doc(this.firestore, 'players', document.id); //El docRef es el que se va a actualizar
      await deleteDoc(docRef); //De aqui nos vamos  al userList
    });
  }
};
/*
 * 1. Creamos la referencia a la coleccion
 * 2. se crea el query para obtener todos los documentos cuyo id sean iguales al id que se le esta pasando al player: Player
 * 3. capturamos todos los documentos, en este caso sera solo uno, sin embargo se utiliza la funcion getDocs
 * 4. por cada uno de los doc que vengan se hace un forEach
 * 5. por cada uno de ellos se hace un docRef osea crear una referencia del documento
 * 6. y se utiliza la funcion updateDoc pasando la referencia del documento, osea el docRef y se le pasa el nuevo valor del ducumento osea el {...player(esto sera el player de arriba)}
 */

