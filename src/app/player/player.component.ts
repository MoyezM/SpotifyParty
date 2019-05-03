import { SpotifyService } from './../spotify.service';
import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements AfterViewInit {

  /**
   * contains the url for the artist image
   *
   * @type {string}
   * @memberof PlayerComponent
   */
  imageURL: string;

  /**
   * contains the array of artists
   * for one song
   *
   * @type {Array<any>}
   * @memberof PlayerComponent
   */
  artists:  Array<any>;

  /**
   * contains the URI that refers to the
   * currently playing artist
   *
   * @type {string}
   * @memberof PlayerComponent
   */
  artistURI: string;

  /**
   * contains the url for the album image
   *
   * @type {*}
   * @memberof PlayerComponent
   */
  artistURL: any;

  /**
   * contains the combined artist string
   *
   * @type {string}
   * @memberof PlayerComponent
   */
  artistCombined: string;

  /**
   * contains the name of the album
   *
   * @type {string}
   * @memberof PlayerComponent
   */
  album: string;

  /**
   *
   *
   * @type {string}
   * @memberof PlayerComponent
   */
  song: string;

  /**
   * contains the current playback duration
   *
   * @type {number}
   * @memberof PlayerComponent
   */
  playBackDuration: number;

  /**
   * contains the playback status
   *
   * @memberof PlayerComponent
   */
  paused = false;

  /**
   * contains the current song object
   *
   * @type {*}
   * @memberof PlayerComponent
   */
  currentSong: any;

  /**
   * holds the total playback time
   *
   * @type {number}
   * @memberof PlayerComponent
   */
  playBackTime: number;

  /**
   * holds the current playback as a percent
   *
   * @type {number}
   * @memberof PlayerComponent
   */
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

  /**
   * Handles changes to the state that
   * are pushed from the spotify SDK
   *
   * @param {*} data
   * @memberof PlayerComponent
   */
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

  /**
   * Handles playback toggling
   *
   * @memberof PlayerComponent
   */
  togglePlayback() {
    this.spotify.togglePlayback(this.paused);
  }

  /**
   * Handles the call to the next song
   *
   * @memberof PlayerComponent
   */
  onNext() {
    this.socket.onNext(this.currentSong);
  }

  /**
   * Goes to the previous song
   *
   * @memberof PlayerComponent
   */
  onPrevious() {
    this.socket.onPrevious(this.currentSong);
  }

  /**
   * Fetches the playback time.
   * It checks the playback every
   * 750ms 
   *
   * @memberof PlayerComponent
   */
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
