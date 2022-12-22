import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor
    (
      private modalCtrl: ModalController,
      private router:Router
    ) { }

  ngOnInit() {
  }

  goToHome(){
    this.router.navigate(['/welcome'])
  }
  goToMember(){
    this.router.navigate(['/home'])
  }
  goToClass(){
    this.router.navigate(['/attendance'])
  }
  goToReport(){
    this.router.navigate(['/report'])
  }

}
