import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  /**
   * Holds the song results, which is the
   * queue that is grabbed from the server
   *
   * @memberof QueueComponent
   */
  songResultName = [];

  constructor(private socket: SocketService) { }

  ngOnInit() {
    this.socket.getQueue();
    this.socket.onQueueUpdated$().subscribe((queue) => {
      this.songResultName = queue;
    });
  }

}
