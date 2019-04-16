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
  }

  onGetSong$() {
    let observable = new Observable(observer => {
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

  onGetSong() {
    this.onGetSong$().subscribe((songQuery) => {
      console.log(songQuery);
      let query = songQuery.query;
      this.spotify.spotifyApi.searchTracks(query).then((result) => {
        console.log(result.tracks.items);
        let searchResult = {
          socketId: songQuery.socketId,
          result: result.tracks.items,
        };
        this.socket.emit('songResults', searchResult);
      });
    });
  }

  onQueueUpdated$() {
    let observable = new Observable(observer => {
      this.socket.on('queueUpdated', (queue) => {
        console.log(queue);
        observer.next(queue);
      });
    });

    let observer =  {
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
}

