import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { enviroments } from './enviroments/enviroments';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
//Y agragamos:
//De esta manera arranca la app no desde un modulo sino desde un componente
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes), //Esto es para cargar las rutas
    importProvidersFrom(
      provideFirebaseApp(() =>initializeApp(enviroments.firebase)),
      provideFirestore(()=> getFirestore())
    )
  ]
}).catch((err)=> console.log(err));



/*
Esto de aqui lo borramos para poder hacer uso de un proyecto ↓
Standalone(Nueva funcionalidad de Angular, lo que permite solo trabajar con componentes
y no con modulos)
*/
/*platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));*/
