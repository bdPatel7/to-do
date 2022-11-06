import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToDoModel } from '../../models/to-do';
import { ToDoService } from '../../services/to-do.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ToDoService) { }

  list: Required<ToDoModel>[] = [];
  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.route.data.subscribe(
      (res) => {
        if(res.data && res.data.length){
          this.list = res.data;
        }
      }
    )
  }

  deleteToDo(id:number): void{
    this.api.deleteToDo(id).subscribe(
      (res) => {
        if(res.success){
          this.api.getToDoList().subscribe(
            (res) => {
              if(res.success){
                this.list = res.data;
              }
            },
            () => {}
          )
        }
      },
      () => {}
    )
  }
}
