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

  toggleEdit(todo: any): void {
    if (!todo.editing) {
      todo.newTitle = todo.title;
    }
    todo.editing = !todo.editing;
  }
  
  updateTodo(todo: any) {
    const updatedTodo = {
      title: todo.newTitle || todo.title,
      done: todo.done,
    };
    this.todoService.updateTodo(todo._id, updatedTodo).subscribe((res) => {
      todo.title = res.title;
      todo.done = res.done;
    });
  }
  

  updateTodoTitle(id: string, newTitle: string) {
    this.todoService.updateTodo(id, { title: newTitle }).subscribe((todo) => {
      const index = this.todos.findIndex((t) => t._id === todo._id);
      this.todos[index].title = newTitle;
    });
  }

  updateTodoStatus(todo: any) {
    const newStatus = !todo.done;
    this.todoService.updateTodo(todo._id, { done: newStatus }).subscribe((updatedTodo) => {
      todo.done = newStatus;
    });
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter((t) => t._id !== id);
    });
  }
}
