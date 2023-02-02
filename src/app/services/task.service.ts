import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private BASE_URL = 'http://localhost:5000/api/v1/tasks'

  constructor(private http: HttpClient) { }

  addTask(task: Task) {
    return this.http.post<any>(this.BASE_URL, task)
  }

  getTask(id: string) {
    return this.http.get<Task>(this.BASE_URL+'/'+id)
  }

  getTasks() {
    return this.http.get<Task[]>(this.BASE_URL+'user-tasks/all')
  }

  updateTask(id:string, name: string, status: string) {
    return this.http.put<any>(this.BASE_URL+'/'+id, {name: name, status: status})
  }

  deleteTask(id:string) {
    return this.http.delete<void>(this.BASE_URL+'/'+id)
  }


}
