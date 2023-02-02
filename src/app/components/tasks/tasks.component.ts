import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  message: string = '';
  tasks: Task[] = [];

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private router: Router
  ) {}

 

  ngOnInit(): void {
    this.message = this.userService.getMessage();
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = res.data;
        console.log(this.tasks);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  onDelete(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: data => {
        alert("task has been deleted successfully.")
        this.ngOnInit();
        this.router.navigateByUrl('/tasks');
      }
    })
  }
}
