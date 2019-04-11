import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  songResultName = [
    {
      song: 'Test Song',
      artist: 'Test Artist'
    },
    {
      song: 'Test sfd Song',
      artist: 'Test Artist'
    },
    {
      song: 'Test f sdSong',
      artist: 'Test Artist'
    },
    {
      song: 'Test sdff dsf Song',
      artist: 'Testsfdsfdssdfsfd Artist'
    },
    {
      song: 'Testsdffdsasdfdfsa Song',
      artist: 'Test fdsfasfadsfsfd Artist'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
