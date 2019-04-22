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

  localIp: string;

  constructor(private bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this.bottomSheet.open(QrCodeComponent);
  }

  ngOnInit() {
  }

}
