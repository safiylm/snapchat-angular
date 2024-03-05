import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderSnapComponent } from './header-snap/header-snap.component';
import { HomeComponent } from './home/home.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthConnexionUserComponent } from './auth-connexion-user/auth-connexion-user.component';
import { AuthInscriptionUserComponent } from './auth-inscription-user/auth-inscription-user.component';
import { PublicationAllListComponent  } from './publication-all-list/publication-all-list.component';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { PublicationComponent } from './publication/publication.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { InteractionSocialComponent } from './interaction-social/interaction-social.component';
import { StatistiqueUserComponent } from './statistique-user/statistique-user.component';
import { AuteurInPostOrCommentaireComponent } from './auteur-in-post-or-commentaire/auteur-in-post-or-commentaire.component';
import { ListFollowersComponent } from './list-followers/list-followers.component';
import { CommentaireListComponent } from './commentaire-list/commentaire-list.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
@NgModule({
  declarations: [
    AppComponent,
    
    HeaderComponent,
    HeaderSnapComponent,
    HomeComponent,
    UsersListComponent,
    AuthConnexionUserComponent,
    AuthInscriptionUserComponent,
    PublicationComponent,
    PublicationAllListComponent,
    PublicationListComponent,
    UserAccountComponent,
    InteractionSocialComponent,
    StatistiqueUserComponent,
    AuteurInPostOrCommentaireComponent,
    ListFollowersComponent,
    CommentaireListComponent,
    CommentaireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}