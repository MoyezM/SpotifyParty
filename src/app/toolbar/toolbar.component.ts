import { QrCodeComponent } from './../qr-code/qr-code.component';
import { Component, OnInit } from '@angular/core';
import { IpService } from '../ip.service';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  /**
   * Holds the local IP for the client
   *
   * @type {string}
   * @memberof ToolbarComponent
   */
  localIp: string;

  constructor(private bottomSheet: MatBottomSheet) {}

  /**
   * Handles the connect button in the toolbar
   * Opens the bottom sheet with the qr-code
   *
   * @memberof ToolbarComponent
   */
  openBottomSheet(): void {
    this.bottomSheet.open(QrCodeComponent);
  }

  ngOnInit() {
  }

}
