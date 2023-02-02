import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  form!: FormGroup;
  message: string = '';
  tasks: Task[] = [];

   name: string = ''
  status: string = ''
  id: string = ''

  task2!: Task
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
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

    // this.name = this.task2.name

    console.log("Task2: ", this.task2);

    console.log("Name: ", this.name);
    
    

    this.form = this.fb.group({
      name: new FormControl(this.name),
      status: new FormControl(this.status),
    });
  }

  handleChange(index: any) {
    this.status = index.target.value
  }

  onSubmit() {
    this.taskService
      .updateTask(this.id, this.form.value.name, this.form.value.status)
      .subscribe((res) => {
        this.userService.setMessage(res.message);
        this.router.navigateByUrl('/tasks');
      });
  }
}
