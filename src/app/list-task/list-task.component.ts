import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  Tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTaskList().subscribe(res => {
      this.Tasks = res.map( e => {
        return {
          id: e.payload.doc.id,

        } as Task;
      })
    });
  }

  removeTask = task => this.taskService.deleteTask(task);

}
