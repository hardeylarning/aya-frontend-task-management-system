import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  readonly loading$ = new BehaviorSubject<boolean>(false);
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

  tinyAlert(message: string) {
    Swal.fire(message);
  }
  successNotification(message: string) {
    Swal.fire('Hi', message, 'success');
  }

  handleChange(index: any) {
    this.status = index.target.value
  }

  onSubmit() {
    this.loading$.next(true)
    this.taskService
      .updateTask(this.id, this.form.value.name, this.form.value.status, this.form.value.startDate, this.form.value.endDate)
      .subscribe((res) => {
        // console.log("Res: ", res);
        
        if(res.status === 'success') {
          this.loading$.next(false)
          this.successNotification("Task has been updated successfully!")
          this.router.navigateByUrl('/tasks');
        }
        else {
          this.loading$.next(false)
          this.tinyAlert(res.message)
          console.log();
          
        }
        
      });
  }


}
