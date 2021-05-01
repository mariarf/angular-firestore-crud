import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  public editForm: FormGroup;
  taskRef: any

  constructor(
    public taskService: TaskService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      name: [''],
      state: [''],
      time: ['']
    })
  }

  ngOnInit(): void {
    const id = this.act.snapshot.paramMap.get('id');

    this.taskService.getTaskDoc(id).subscribe(res => {
      this.taskRef = res;
      this.editForm = this.formBuilder.group({
        name: [this.taskRef.name],
        state: [this.taskRef.state],
        time: [this.taskRef.time]
      })
    })
  }

  onSubmit() {
    const id = this.act.snapshot.paramMap.get('id');

    this.taskService.updateTask(this.editForm.value, id);
    this.router.navigate(['list-tasks']);
  };

}
