import { Routes } from '@angular/router';

import {PublicComponent} from './ui/public/public.component'
import {PrivateComponent} from './ui/private/private.component'
import {ErrorComponent} from './ui/error/error.component'

export const appRoutes: Routes = [
 { path: 'home', component: PublicComponent },
 { path: 'private', component: PrivateComponent },
 { path: '', redirectTo: 'home', pathMatch: 'full' },
 { path: '**', component: ErrorComponent }
];
