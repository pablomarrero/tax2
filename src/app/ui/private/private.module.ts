import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { privateRouting } from './private.routing';
import { PrivateComponent } from './private.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    PrivateComponent,
    ProfileComponent,
    MenuComponent
  ],
  imports: [
    privateRouting,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxErrorsModule
  ]
})
export class PrivateModule {}
