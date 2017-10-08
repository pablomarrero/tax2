import { Routes } from '@angular/router';

import { PublicComponent } from './ui/public/public.component';
import { PrivateComponent } from './ui/private/private.component';
import { PrivateGuard } from './ui/guards/private.guard';

export const appRoutes: Routes = [
 { path: 'home', component: PublicComponent },
 { path: 'private', component: PrivateComponent, canActivate: [ PrivateGuard ] },
 { path: '', redirectTo: 'home', pathMatch: 'full' }
];
