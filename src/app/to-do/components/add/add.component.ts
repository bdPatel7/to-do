import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoModel } from '../../models/to-do';
import { ToDoService } from '../../services/to-do.service';
import { UtilService } from 'src/app/app-core/services/util.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  formGroup!: FormGroup;
  todo!: ToDoModel;
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private api: ToDoService, 
    private router: Router,
    private util: UtilService,
  ) { }

  get fg(): any {
    return this.formGroup.controls;
  }
  
  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.route.data.subscribe(
      (res) => {
        this.todo = res.data;
        this.formGroup = this.createToDoForm(res.data);
      }
    )

  }

  private createToDoForm(data: ToDoModel): FormGroup {
    const { firstName, middleName, lastName, email, phone } = data || {} as Object;
    return this.fb.group({
      firstName: [firstName || '', [Validators.required]],
      middleName: [middleName || '', [Validators.required]],
      lastName: [lastName || '', [Validators.required]],
      email: [email || '', [Validators.required, Validators.pattern(this.util.getEmailRegex())]],
      phone: [phone || '', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    })
  }

  addToDo(): void{
    if(this.formGroup.invalid){
      return;
    }
    this.isSubmitted = true;
    this.api.addToDo(this.formGroup.value, this.todo?.id).subscribe(
      () => {
        this.isSubmitted = false;
        this.router.navigate(['/to-do/list'])
        
      },
      () => {
        this.isSubmitted = false;
      }
    )
  }
}
