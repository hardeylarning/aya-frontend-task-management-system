import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  id: any;
  task!: Task
  form!: FormGroup;
  name: string = ''
  status: string = ''
  startDate: string = ''
  endDate: string = ''


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private taskService: TaskService,
    private userService: UserService,
    private router: Router
  ) {
    this.form = fb.group({
      name: [this.name],
      status: [this.status],
      startDate: [this.startDate],
      endDate: [this.endDate],
    })
   }

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.id = res['id'];
  
      this.taskService.getTask(this.id).subscribe((data) => {
        this.task = data.data;
        // console.log('Data', this.task);

        this.name = this.task.name
        this.status = this.task.status
        this.startDate = this.task.startDate
        this.endDate = this.task.endDate
        
        this.form = this.fb.group({
          name: new FormControl(this.name),
          status: new FormControl(this.status),
          startDate: new FormControl(this.startDate),
          endDate: new FormControl(this.endDate)
        });
      });
    });
  }

  handleChange(index: any) {
    this.status = index.target.value
  }

  onSubmit() {
    this.taskService
      .updateTask(this.id, this.form.value.name, this.form.value.status, this.form.value.startDate, this.form.value.endDate)
      .subscribe((res) => {
        this.userService.setMessage(res.message);
        alert("Task has been updated successfully!")
        this.router.navigateByUrl('/tasks');
      });
  }


}
