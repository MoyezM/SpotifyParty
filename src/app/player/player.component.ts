import { SpotifyService } from './../spotify.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  constructor(private spotify: SpotifyService) {
    this.spotify.init();
  }

}
