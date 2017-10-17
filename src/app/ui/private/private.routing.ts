import { Routes, RouterModule } from '@angular/router';

import { PrivateComponent } from './private.component';
import { ProfileComponent } from './profile/profile.component';
import { PrivateGuard } from '../guards/private.guard';

const PRIVATE_ROUTES: Routes = [
    {
        path: '',  // you can keep it empty if you do not want /home
        component: PrivateComponent,
        canActivate: [PrivateGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
];

export const privateRouting = RouterModule.forChild(PRIVATE_ROUTES);
