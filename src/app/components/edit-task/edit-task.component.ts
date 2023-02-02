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


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private taskService: TaskService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.id = res['id'];

      console.log("ID: ", this.id);
      
      this.taskService.getTask(this.id).subscribe((data) => {
        this.task = data;
        console.log('Data', data);
        
        this.form = this.fb.group({
          name: new FormControl(this.name),
          status: new FormControl(this.status)
        });
      });
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
        alert("Task has been updated successfully!")
        this.router.navigateByUrl('/tasks');
      });
  }


}
