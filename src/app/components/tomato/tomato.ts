import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DraggableDirective } from '../../directives/draggable';

@Component({
  selector: 'app-tomato',
  standalone: true,
  imports: [
    CommonModule,
    DraggableDirective
  ],
  templateUrl: './tomato.html',
  styleUrls: ['./tomato.scss']
})
export class Tomato {
  @ViewChild('tomato', { static: true }) tomatoRef!: ElementRef;
  
  modes: Record<Mode, number> = {
    'tomato-session': 25,
    'short-break': 5,
    'long-break': 15
  };

  selectedMode: Mode = 'tomato-session';
  minutes: number = this.modes[this.selectedMode];
  seconds: number = 0;
  isRunning = false;
  timer: any = null;

  // Set the selected mode and reset the timer
  setMode(mode: Mode): void {
    this.selectedMode = mode;
    this.resetTimer();
    this.minutes = this.modes[mode];
    this.updateTimeDisplay();
  }

  // Start the countdown timer
  startTimer(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.timer = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.stopTimer();
          return;
        }
        this.minutes--;
        this.seconds = 59;
      } else {
        this.seconds--;
      }
      this.updateTimeDisplay();
    }, 1000);
  }

  // Stop the timer
  stopTimer(): void {
    this.isRunning = false;
    clearInterval(this.timer);
  }

  // Reset timer to current mode's full time
  resetTimer(): void {
    this.stopTimer();
    this.minutes = this.modes[this.selectedMode];
    this.seconds = 0;
    this.updateTimeDisplay();
  }

  // Update the time shown in the DOM
  updateTimeDisplay(): void {
    const timeEl = document.getElementById('time');
    if (timeEl) {
      const min = this.minutes.toString().padStart(2, '0');
      const sec = this.seconds.toString().padStart(2, '0');
      timeEl.textContent = `${min}:${sec}`;
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
  
}

type Mode = 'tomato-session' | 'short-break' | 'long-break';

