// src/app/todo/todo.component.ts
import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  newTodo: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  addTodo() {
    if (!this.newTodo) return;
    this.todoService.addTodo({ title: this.newTodo, done: false }).subscribe((todo) => {
      this.todos.push(todo);
      this.newTodo = '';
    });
  }

  updateTodo(id: string, updatedTodo: any) {
    this.todoService.updateTodo(id, updatedTodo).subscribe((todo) => {
      const index = this.todos.findIndex((t) => t._id === todo._id);
      this.todos[index] = todo;
    });
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter((t) => t._id !== id);
    });
  }
}
