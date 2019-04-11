import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PlayerComponent } from './player/player.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  MatInputModule,
  MatProgressBarModule,
  MatCardModule,
} from '@angular/material';
import { QueueComponent } from './queue/queue.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PlayerComponent,
    ToolbarComponent,
    QueueComponent

  ],
  imports: [
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
