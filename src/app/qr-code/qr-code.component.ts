import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { IpService } from '../ip.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<QrCodeComponent>, private ip: IpService) {}

  /**
   * Holds the local IP for the client
   *
   * @type {string}
   * @memberof QrCodeComponent
   */
  public localIp: string;

  /**
   * Handles the connect call from the toolbar
   *
   * @param {MouseEvent} event
   * @memberof QrCodeComponent
   */
  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnInit() {
    this.localIp = this.ip.getIp();
    console.log(this.localIp);
  }

}
