import { Component, OnInit } from '@angular/core';
import { IpService } from '../ip.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  localIp: string;

  constructor(private ip: IpService) { }

  ngOnInit() {
    this.localIp = this.ip.getIp();
    console.log(this.localIp);
  }

}
