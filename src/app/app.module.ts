import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { AuthMethods, AuthProvider, FirebaseUIAuthConfig, FirebaseUIModule, AuthProviderWithCustomConfig } from 'firebaseui-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';
import { HeaderComponent } from './ui/public/header/header.component';
import { FooterComponent } from './ui/public/footer/footer.component';
import { MainComponent } from './ui/public/main/main.component';
import { GeneralComponent } from './ui/public/general/general.component';
import { SellerComponent } from './ui/public/seller/seller.component';
import { DeliveryComponent } from './ui/public/delivery/delivery.component';
import { RegistrationComponent } from './ui/public/registration/registration.component';
import { LoginComponent } from './ui/login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PublicComponent } from './ui/public/public.component';
import { appRoutes } from './app.routes';
import { PrivateGuard } from './ui/guards/private.guard';
import { AuthService } from './ui/auth/auth.service';

const facebookCustomConfig: AuthProviderWithCustomConfig = {
  provider: AuthProvider.Facebook,
  customConfig: {
    scopes: [
      'public_profile',
      'email',
      'user_likes',
      'user_friends'
    ],
    customParameters: {
      // Forces password re-entry.
      auth_type: 'reauthenticate'
    }
  }
};

const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
  providers: [
    AuthProvider.Google,
    facebookCustomConfig,
    AuthProvider.Password,
    AuthProvider.Phone
  ],
  method: AuthMethods.Popup
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    GeneralComponent,
    SellerComponent,
    DeliveryComponent,
    RegistrationComponent,
    LoginComponent,
    PublicComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    RouterModule.forRoot(appRoutes),
    NgxErrorsModule
  ],
  providers: [
    AuthService,
    PrivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
