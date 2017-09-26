import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

 
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { AuthMethods, AuthProvider, FirebaseUIAuthConfig, FirebaseUIModule, AuthProviderWithCustomConfig } from 'firebaseui-angular';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { MainComponent } from './ui/main/main.component';
import { GeneralComponent } from './ui/general/general.component';
import { SellerComponent } from './ui/seller/seller.component';
import { DeliveryComponent } from './ui/delivery/delivery.component';
import { RegistrationComponent } from './ui/registration/registration.component';
import { LoginComponent } from './ui/login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PublicComponent } from './ui/public/public.component';
import { ErrorComponent } from './ui/error/error.component';
import { PrivateComponent } from './ui/private/private.component';
import { appRoutes } from './app.routes';

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
    PublicComponent,
    ErrorComponent,
    PrivateComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
