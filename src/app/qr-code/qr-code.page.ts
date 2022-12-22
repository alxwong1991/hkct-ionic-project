import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  async dismiss() {
    await this.modalController.dismiss();
  }
}
