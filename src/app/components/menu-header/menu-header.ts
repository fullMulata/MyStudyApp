import { Component } from '@angular/core';
import { Calculator } from '../calculator/calculator';
import { CommonModule } from '@angular/common';
import { Calendar } from '../calendar/calendar';
import { CalendarCreator } from '../calendar/calendarCreator.service';
import { Todo } from '../todo/todo';
import { Tomato } from '../tomato/tomato';

@Component({
  selector: 'app-menu-header',
  standalone: true,
  imports: [
    Calculator,
    CommonModule,
    Calendar,
    Todo,
    Tomato
  ],
  templateUrl: './menu-header.html',
  styleUrls: ['./menu-header.scss'],
  providers: [CalendarCreator],
})
export class MenuHeader {
  showCalculator: boolean = false;
  showCalendar: boolean = false;
  showTodo: boolean = false;
  showTomato: boolean = false;

  constructor(
    private calendarCreator: CalendarCreator
  ) {}

}
