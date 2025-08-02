import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TodoItem } from '../../../models/todoItem';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DraggableDirective } from '../../directives/draggable';


@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgFor,
    NgClass,
    DraggableDirective   
  ],
  templateUrl: './todo.html',
  styleUrls: ['./todo.scss']
})
export class Todo {
  todoList: TodoItem[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      newTask: ['', [Validators.required]]
    });
  }

  addTask(){
    if (this.formGroup.valid) {
      let newTodoItem: TodoItem = {
        id: Date.now(),
        task: this.formGroup.get('newTask')?.value,
        completed: false
      };

      this.todoList.push(newTodoItem);
      console.log(this.todoList);
      this.formGroup.reset();
      
    }
  }

  deleteTask(id:number){
    let index = this.todoList.findIndex(i => i.id = id);
    this.todoList.splice(index,1);
  }

  completeTask(id:number){
    let index = this.todoList.findIndex(i => i.id = id);
    this.todoList[index].completed = !this.todoList[index].completed;
  }
  
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const key = event.key;
    
    if (key === 'Enter' || key === '=') {
      event.preventDefault();
      this.addTask();
    } 
  }
}
