import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  public taskForm: FormGroup;
  constructor(
    public taskService: TaskService,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    this.taskForm = this.formBuilder.group({
      name: [''],
      state: [''],
      time: ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.taskService.createTask(this.taskForm.value);
    this.router.navigate(['list-tasks']);
  };
}
