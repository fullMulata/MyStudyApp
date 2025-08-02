import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { evaluate } from 'mathjs';
import { DraggableDirective } from '../../directives/draggable';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    CommonModule,
    DraggableDirective
  ],
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss'
})
export class Calculator {
  expression: string = "";
  
  canc(){
    this.expression = "";
  }
  
  back(){
    this.expression = this.expression.slice(0,-1);
  }
  
  calculate(){
    this.expression = evaluate(this.expression).toString();
  }
  
  appendInput(newInput: string){
    if (newInput === '(' && this.expression.length > 0 && this.lastIsNumber()) {
      return;
    }
    
    if (newInput === ')') {
      const openCount = this.countChar(this.expression, '(');
      const closeCount = this.countChar(this.expression, ')');
      
      if (!this.lastIsNumber() || closeCount >= openCount) {
        return;
      }
    }
    
    if (newInput === '+/-') {
      this.expression = this.toggleSign(this.expression);
      return;
    }
    
    this.expression = this.expression.concat(newInput);
  }
  
  toggleSign(expr: string): string {
    if (expr.startsWith('-')) return expr.slice(1);
    return '-' + expr;
  }
  
  lastIsNumber(): boolean{
    let lastChar = this.expression.charAt(this.expression.length-1);
    
    return /[\d)]/.test(lastChar);
  }
  
  countChar(str: string, char: string): number {
    return str.split(char).length - 1;
  }
  
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const key = event.key;
    
    if (!isNaN(+key) || ['+', '-', '*', '/', '(', ')', '.'].includes(key)) {
      this.appendInput(key);
    } else if (key === 'Enter' || key === '=') {
      event.preventDefault();
      this.calculate();
    } else if (key === 'Backspace') {
      event.preventDefault();
      this.back();
    } else if (key === 'Escape') {
      this.canc();
    }else if (key.toLowerCase() === 'n') {
      this.appendInput('+/-');
    }    
  }
  
}
