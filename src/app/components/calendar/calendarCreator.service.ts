import { Injectable } from "@angular/core";
import { Day } from "../../../models/day";

@Injectable()
export class CalendarCreator {
    currentYear: number;
    currentMonthIndex: number;
    
    constructor(){
        let date = new Date();
        this.currentYear = date.getFullYear();
        this.currentMonthIndex = date.getMonth();
    }
    
    getCurrentMonth(): Day[]{
        return this.getMonth(this.currentMonthIndex, this.currentYear);
    }
    
    getMonth(currentMonthIndex: number, currentYear: number): Day[] {
        let days: Day[] = [];
        
        const countDaysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
        
        let firstDay = this.createDay(1, currentMonthIndex, currentYear);
        for (let index = 0; index < firstDay.weekDayNumber; index++) {
            days.push({
                weekDayNumber: index,
                monthIndex: currentMonthIndex,
                year: currentYear,
            } as Day); 
        }
        
        for (let dayNumber = 1; dayNumber <= countDaysInMonth; dayNumber++) {
            days.push(this.createDay(dayNumber, currentMonthIndex, currentYear));
        }
        
        return days;
    }
    
    createDay(dayNumber: number, currentMonthIndex: number, currentYear: number): Day {
        let day = new Day();
        const date = new Date(currentYear, currentMonthIndex, dayNumber);
        
        day.monthIndex = currentMonthIndex;
        day.month = this.getMonthName(currentMonthIndex);
        day.dayNumber = dayNumber;
        day.year = currentYear;
        
        const adjustedWeekDay = (date.getDay() + 6) % 7; 
        day.weekDayNumber = adjustedWeekDay;
        day.weekDayName = this.getWeekDayName(adjustedWeekDay);
        
        return day;
    }
    
    getWeekDayName(weekDayNumber: number): string {
        switch (weekDayNumber) {
            case 0:
            return "Mo";
            case 1:
            return "Tu";
            case 2:
            return "We";
            case 3:
            return "Th";
            case 4:
            return "Fr";
            case 5:
            return "Sa";
            case 6:
            return "Su";
            default:
            return "";
        }
    }  
    
    getMonthName(currentMonthIndex: number): string {
        switch (currentMonthIndex) {
            case 0:
            return "January";
            case 1:
            return "February";
            case 2:
            return "March";
            case 3:
            return "April";
            case 4:
            return "May";
            case 5:
            return "June";
            case 6:
            return "July";
            case 7:
            return "August";
            case 8:
            return "September";
            case 9:
            return "October";
            case 10:
            return "November";
            case 11:
            return "December";
            default:
            return "";
        }
    }  
    
}

