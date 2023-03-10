import { Component, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ModalController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnDestroy {
  
  sc:any;
  qrCodeString = "12345678";
  checkName = async () => {
    this.sc = await Preferences.get({ key: 'sc' });
  
    this.qrCodeString = this.sc;
    console.log(this.sc);
  };
  
  scannedResult: any;
  content_visibility = '';

  constructor(public modalController: ModalController) {}

  

  

  async dismiss() {
    await this.modalController.dismiss();
  }

  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      this.content_visibility = 'show';
      BarcodeScanner.showBackground();
      document.querySelector('body')?.classList.remove('scanner-active');
      if (result?.hasContent) {
        this.scannedResult = "Success!";
        console.log(this.scannedResult);
        if(this.scannedResult == '12345678'){
         
        }
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
  }

  ngOnDestroy(): void {
    this.stopScan();
  }
}
