import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  songResultName = [];

  constructor(private socket: SocketService) { }

  ngOnInit() {
    this.socket.onGetQueue()

  }

}
