import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseBeanModel } from 'src/app/app-core/models/response-bean';
import { UtilService } from 'src/app/app-core/services/util.service';
import { LoginModel } from '../../models/login';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;
  isPasswordVisible = false;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private util:UtilService,
    private toastr: ToastrService
  ) { }
  get fg(): any {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
    this.formGroup = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      email: ['admin@gmail.com', [Validators.required, Validators.pattern(this.util.getEmailRegex())]],
      password: ['admin', [Validators.required]],
    });
  }

  onLogin(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.isSubmitted = true;
    this.auth.login(this.formGroup.value as LoginModel).subscribe(
      (res: ResponseBeanModel) => {        
        if(res.data.token){
          this.toastr.success('Login Successful')
          this.router.navigate(['/to-do']);
        }
        this.isSubmitted = false;
      },
      (err: HttpErrorResponse) => {
        this.toastr.error(err.message);
        this.isSubmitted = false;
      },
    )
  }
}
