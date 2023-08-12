import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginRequest } from '../../core/interface/authorization/login-request';
import { LoginService } from '../../core/service/authorization/login.service';

@Component({
  selector: 'bh-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm: FormGroup = this.initializeLoginForm();
  loginSubscription = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  initializeLoginForm() {
    return (this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    }));
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginRequest: LoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.loginSubscription = this._loginService.login(loginRequest).subscribe({
      next: (data) => console.log('Login Successful'),
      error: (err) => console.log(err),
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}
