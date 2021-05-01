import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from '../app/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private angularFirestore: AngularFirestore) {}

  getTaskDoc(id: string) {
    return this.angularFirestore
    .collection('task-collection')
    .doc(id)
    .valueChanges()
  }

  getTaskList() {
    return this.angularFirestore
    .collection("task-collection")
    .snapshotChanges();
  }

  createTask(task: Task) {
    return new Promise<any>((resolve, reject) =>{
      this.angularFirestore
        .collection("task-collection")
        .add(task)
        .then(response => { console.log(response) }, error => reject(error));
    });
  }

  deleteTask(task: Task) {
    return this.angularFirestore
      .collection("task-collection")
      .doc(task.id)
      .delete();
  }

  updateTask(task: Task, id: string) {

    return this.angularFirestore
      .collection("task-collection")
      .doc(id)
      .update({
        name: task.name,
        state: task.state,
      });
  }
}
