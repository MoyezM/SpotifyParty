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
      artist: 'Test Artist',
      votes: '12'
    },
    {
      song: 'Test sfd Song',
      artist: 'Test Artist',
      votes: '152'
    },
    {
      song: 'Test f sdSong',
      artist: 'Test Artist',
      votes: '144'
    },
    {
      song: 'Test sdff dsf Song',
      artist: 'Testsfdsfdssdfsfd Artist',
      votes: '1'
    },
    {
      song: 'Testsdffdsasdfdfsa Song',
      artist: 'Test fdsfasfadsfsfd Artist',
      votes: '142'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
