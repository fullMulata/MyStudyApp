import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarCreator} from './calendarCreator.service';
import { Day } from '../../../models/day';
import { DraggableDirective } from '../../directives/draggable';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    DraggableDirective
  ],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss'
})
export class Calendar implements OnInit{

  monthDays: Day[] = [];
  monthNumber: number ;
  year: number;
  weekDaysName: string[] = [];
  
  constructor(
    public calendarCreator: CalendarCreator
  ){
    
  }  
  
  ngOnInit(): void {
    this.setMonthDays(this.calendarCreator.getCurrentMonth());
    
    this.weekDaysName.push("Mo");
    this.weekDaysName.push("Tu");
    this.weekDaysName.push("We");
    this.weekDaysName.push("Th");
    this.weekDaysName.push("Fr");
    this.weekDaysName.push("Sa");
    this.weekDaysName.push("Su");
  }
  
  private setMonthDays(days: Day[]) {
    this.monthDays = days;
    console.debug(this.monthDays);
    this.monthNumber = this.monthDays[0].monthIndex;
    this.year = this.monthDays[0].year;
  }

  onNextMonth(){
    this.monthNumber++;

    if (this.monthNumber == 13) {
      this.monthNumber = 1;
      this.year++;
    }

    this.setMonthDays(this.calendarCreator.getMonth(this.monthNumber, this.year));
  }

  onPreviousMonth(){
    this.monthNumber--;

    if (this.monthNumber < 1) {
      this.monthNumber = 12;
      this.year--;  
    }

    this.setMonthDays(this.calendarCreator.getMonth(this.monthNumber, this.year));
  }
  
}

