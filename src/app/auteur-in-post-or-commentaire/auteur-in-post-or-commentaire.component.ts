import { Component, OnInit, Input } from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user-service';
import { Subscription } from 'rxjs';

@Component({
  standalone:true, 
  selector: 'app-auteur-in-post-or-commentaire',
  templateUrl: './auteur-in-post-or-commentaire.component.html',
  styleUrls: ['./auteur-in-post-or-commentaire.component.scss']
})

export class AuteurInPostOrCommentaireComponent  implements OnInit {
 
  //Passing Data into this Component
  @Input() id !: string ;
  subscription !: Subscription;
  user !: User;

  constructor(private UserService: UserService) { }


  retrieveUser(): void {
    this.subscription = this.UserService.getUser( this.id) 
      .subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (e) => console.error(e)
      });
  }

  ngOnInit() {
   this.retrieveUser()
  }

  get PhotoProfil(){
    return (this.user  && this.user.photos_profil )? this.user.photos_profil : null
  }
  
  get UserName(){
    return (this.user && this.user.firstName && this.user.lastName )? this.user.firstName+" "+ this.user.lastName : null
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  
}