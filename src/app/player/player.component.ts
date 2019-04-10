import { SpotifyService } from './../spotify.service';
import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  imageURL: string;
  artists:  Array<any>;
  artistCombined: string;
  album: string;
  song: string;
  playBackDuration: number;
  paused: boolean;
  currentSong: any;

  state = this.spotify.state$.subscribe(data => {
    console.log(data);
    this.updateState(data);
  });

  constructor(private spotify: SpotifyService, private ref: ChangeDetectorRef) {
    this.spotify.init();
  }

  updateState(data: any) {
    if (this.imageURL !== data.track_window.current_track.album.images[2].url) {
      this.imageURL = data.track_window.current_track.album.images[2].url;
      this.ref.detectChanges();
    }
    if (this.artists !== data.track_window.current_track.artists) {
      this.artists = data.track_window.current_track.artists;
      this.artistCombined = this.artists.map(artist  => artist.name).join(', ');
      this.ref.detectChanges();
    }
    if (this.album !== data.track_window.current_track.artists) {
      this.album = data.track_window.current_track.album.name;
      this.ref.detectChanges();
    }
    if (this.song !== data.track_window.current_track.name) {
      this.playBackDuration = data.duration;
      this.song = data.track_window.current_track.name;
      this.ref.detectChanges();
    }
    if (this.paused !== data.paused) {
      this.paused = data.paused;
      this.ref.detectChanges();
    }

    const song = {
      song: data.track_window.current_track.name,
      artist: data.track_window.current_track.artists[0].name,
      uri: data.track_window.current_track.uri
    };

    if (this.currentSong !== song) {
      this.currentSong = song;
    }
  }

}
