import { Routes } from "@angular/router";
import { UserAddComponent } from "./pages/users/user-add/user-add.component";
import { UserEditComponent } from "./pages/users/user-edit/user-edit.component";

export const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users',
        
    },
    {
        path: 'users',
        loadChildren: () => import('./pages/users/users.routes').then((routes) => routes.UserRoutes)
    },
];

