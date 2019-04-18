import { SpotifyService } from './spotify.service';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor(private spotify: SpotifyService) {
    this.connect();
    this.onPlaySong$().subscribe((song) => {
      console.log(song);
      this.spotify.spotifyApi.play({
        uris: [song.uri]
      });
    });
  }

  onGetSong$() {
    const observable = new Observable(observer => {
      this.socket.on('getSongFromClient', (songQuery) => {
        observer.next(songQuery);
      });
    });

    let observer =  {
      next: (songQuery) => {
        return songQuery;
      }
    };
    return Rx.Subject.create(observer, observable);
  }

  onPlaySong$() {
    const observable = new Observable(observer => {
      this.socket.on('playSong', (song) => {
        observer.next(song);
      });
    });

    let observer =  {
      next: (song) => {
        return song;
      }
    };
    return Rx.Subject.create(observer, observable);
  }

  onGetSong() {
    this.onGetSong$().subscribe((songQuery) => {
      const query = songQuery.query;
      this.spotify.spotifyApi.searchTracks(query).then((result) => {
        const searchResult = {
          socketId: songQuery.socketId,
          result: result.tracks.items,
        };
        this.socket.emit('songResults', searchResult);
      });
    });
  }

  onQueueUpdated$() {
    const observable = new Observable(observer => {
      this.socket.on('queueUpdated', (queue) => {
        observer.next(queue);
      });
    });

    const observer =  {
      next: (queue) => {
        return queue;
      }
    };
    return Rx.Subject.create(observer, observable);
  }

  connect() {
    this.socket = io('http://localhost:8888/');
    this.onGetSong();
  }

  getQueue() {
    this.socket.emit('getQueue');
  }

  onNext(currentSong) {
    this.socket.emit('next', currentSong);
  }

  onPrevious(currentSong) {
    this.socket.emit('previous', currentSong);
  }
}

