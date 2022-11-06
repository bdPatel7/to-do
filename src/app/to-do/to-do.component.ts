import { Component, OnInit } from '@angular/core';
import { UtilService } from '../app-core/services/util.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {

  constructor(
    private util: UtilService
  ) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.util.logout();
  }

}
