// src/app/todo/todo.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly API_URL = 'http://localhost:5000/api/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  addTodo(todo: any): Observable<any> {
    return this.http.post(this.API_URL, todo);
  }

  updateTodo(id: string, updatedTodo: any): Observable<any> {
    return this.http.patch(`${this.API_URL}/${id}`, updatedTodo);
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
