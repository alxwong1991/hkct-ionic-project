import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { QrCodePage } from '../qr-code/qr-code.page';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}

  async login() {
    const modal = await this.modalCtrl.create({
      component: LoginPage,
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'login-modal',
    });

    return await modal.present();
  }

  async qrCode() {
    const modal = await this.modalCtrl.create({
      component: QrCodePage,
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'qr-code-modal',
    });

    return await modal.present();
  }
}
