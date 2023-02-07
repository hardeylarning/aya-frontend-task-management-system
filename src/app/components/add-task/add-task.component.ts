import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/model/task';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  isLoading: Boolean = false
  readonly loading$ = new BehaviorSubject<boolean>(false);

  constructor(private userService: UserService, 
              private taskService: TaskService,
              private sweetAlertService: SweetAlertService,
              private router: Router) { }

  ngOnInit(): void {
  }

  tinyAlert(message: string) {
    Swal.fire(message);
  }
  successNotification(message: string) {
    Swal.fire('Hi', message, 'success');
  }

   status: any;
   name: string = ''
   startDate: any;
   endDate: any


  handleChange(index: any) {
    this.status = index.target.value
  }

  onSubmit() {
    const userId = this.userService.userLoggedIn() || ''

    const task: Task = new Task('', this.name, this.status, false, userId, this.startDate, this.endDate)

    this.taskService.addTask(task).subscribe({next: (data) =>{
      this.loading$.next(true)
      if(data.status === 'success'){
        this.loading$.next(false)
        this.successNotification("Task has been added successfully")
      }
      else {
        this.isLoading = false
        this.tinyAlert(data.message)
      }
      window.location.reload();
      // this.router.navigateByUrl('/tasks')
  }, 
  error: (err) => {
    this.isLoading = false
    console.log(err)
    this.tinyAlert("Network Error!")
  }
  })
    
  }

}
