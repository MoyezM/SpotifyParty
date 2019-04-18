import { SpotifyService } from './../spotify.service';
import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements AfterViewInit{
  imageURL: string;
  artists:  Array<any>;
  artistURI: string;
  artistURL: any;
  artistCombined: string;
  album: string;
  song: string;
  playBackDuration: number;
  paused = false;
  currentSong: any;
  playBackTime: number;
  playBackPercent: number;



  state = this.spotify.state$.subscribe(data => {
    this.updateState(data);
  });

  constructor(private spotify: SpotifyService, private ref: ChangeDetectorRef, private socket: SocketService) {
    this.getPlaybackTime();
  }

  ngAfterViewInit(): void {
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
    if (this.artistURI !== data.track_window.current_track.artists[0].uri) {
      this.artistURI = data.track_window.current_track.artists[0].uri.substring(15);
      this.artistURL = this.spotify.spotifyApi.getArtist(this.artistURI).then((artist) => {
        this.artistURL = artist.images[2].url;
        this.ref.detectChanges();
      });
    }
    if (this.paused !== data.paused) {
      this.paused = data.paused;
      this.ref.detectChanges();
    }

    const song = {
      song: data.track_window.current_track.name,
      artist: data.track_window.current_track.artists[0].name,
      uri: data.track_window.current_track.uri,
      votes: 0
    };

    if (this.currentSong !== song) {
      this.currentSong = song;
    }
  }

  togglePlayback() {
    this.spotify.togglePlayback(this.paused);
  }

  onNext() {
    this.socket.onNext(this.currentSong);
  }

  onPrevious() {
    this.socket.onPrevious(this.currentSong);
  }

  getPlaybackTime() {
    setInterval(() => {
      if (!this.paused) {
        this.spotify.spotifyApi.getMyCurrentPlaybackState().then((data) => {
          this.playBackTime = data.progress_ms;
          this.playBackPercent = 100 * this.playBackTime / this.playBackDuration;
          this.ref.detectChanges();
          if (this.playBackPercent >= 99.5) {

            this.socket.onNext(this.currentSong);
          }
        });
      }
    }, 750);
  }

}
