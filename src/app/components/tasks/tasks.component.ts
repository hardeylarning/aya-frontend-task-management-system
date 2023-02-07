import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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

  tinyAlert(message: string) {
    Swal.fire(message);
  }
  successNotification(message: string) {
    Swal.fire('Hi', message, 'success');
  }

 

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  onDelete(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: data => {
        if(data.status === 'success') {
          this.successNotification("task has been deleted successfully.")
          this.ngOnInit();
        }

        else {
          this.tinyAlert(data.message)
        }
        
        // this.router.navigateByUrl('/tasks');
      }
    })
  }
}
