import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(private userService: UserService, 
              private taskService: TaskService,
              private router: Router) { }

  ngOnInit(): void {
  }

   status: any;
   name: string = ''


  handleChange(index: any) {
    // console.log('Index: ', index.target.value);
    this.status = index.target.value
  }

  onSubmit() {
    const userId = this.userService.userLoggedIn() || ''

    const task: Task = new Task('', this.name, this.status, false, userId, '', '')

    this.taskService.addTask(task).subscribe({next: (data) =>{
      this.userService.setMessage("Task has been added successfully.")
      alert("Task has been added successfully.")
      this.router.navigateByUrl('/tasks')
  }, 
  error: (err) => {
    console.log(err)
    this.userService.setMessage("Network Error!")
  }
  })
    
  }

}
