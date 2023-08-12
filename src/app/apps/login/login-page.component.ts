import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginRequest } from '../../core/interface/authorization/login-request';
import { AuthService } from 'src/app/core/service/authentication/auth.service';
import { Router } from '@angular/router';
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
    private authService: AuthService,
    private router: Router
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

    this.loginSubscription = this.authService.login(loginRequest).subscribe({
      next: (_) => this.router.navigate(['/home']),
      error: (err) => console.log(err),
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}
