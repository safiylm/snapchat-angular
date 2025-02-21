import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user-service'
import { User } from '../../models/user.model'
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatistiqueUserComponent } from '../statistique-user/statistique-user.component';
import { NgIf } from '@angular/common';
import { ButtonFollowComponent } from '../button-follow/button-follow.component';


@Component({
  standalone:true, 
  selector: 'app-header-snap',
  templateUrl: './header-snap.component.html',
  styleUrls: ['./header-snap.component.scss'], 
  imports:[StatistiqueUserComponent, NgIf, ButtonFollowComponent]
})


export class HeaderSnapComponent implements OnInit {

  @Input() id !: string;
  isMe: boolean = false;
  user !: User;
  isDisplayPhotoViewerProfil !: boolean;
  isDisplayPhotoViewerBackground !: boolean;
  subscription !: Subscription;

   
  constructor(private userService: UserService, 
    private router: ActivatedRoute,  private route: Router) {
      this.user = router.snapshot.data['user'];
   }

   ngOnInit() {
    // this.displayUser();
     this.isDisplayPhotoViewerProfil = false;
     this.isDisplayPhotoViewerBackground = false;
     
     if (localStorage.getItem('userId') == this.id) {
       this.isMe = true;
     }
     setTimeout(() => {
      // this.checkIfDejaAbonnee();
     }, 400)
   }


  hidePhotoViewerProfil() {
    this.isDisplayPhotoViewerProfil = false;
  }

  hidePhotoViewerBackground() {
    this.isDisplayPhotoViewerBackground = false;
  }

  showPhotoViewerProfil() {
    this.isDisplayPhotoViewerProfil = true;
  }

  showPhotoViewerBackground() {
    this.isDisplayPhotoViewerBackground = true;
  }

  get UserName() {
    return (this.user && this.user.firstName && this.user.lastName) ? this.user.firstName + " " + this.user.lastName : null
  }
  get UserPhotoProfil() {
    return (this.user && this.user.photos_profil) ? this.user.photos_profil : null
  }

  get UserPhotoBackground() {
    return (this.user && this.user.photos_background) ? this.user.photos_background : null
  }

  logout(){
    this.userService.logout();  
    this.route.navigate(['/']);
  }

  ngOnDestroy(){
//    this.subscription.unsubscribe();
  }
  
}


