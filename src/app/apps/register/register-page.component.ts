import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterRequest } from '../../core/interface/authorization/register-request';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/service/authentication/auth.service';
import { Router } from '@angular/router';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'bh-register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  registerForm: FormGroup = this.initializeRegisterForm();
  registerSubscription = new Subscription();
  loading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private _notifierService: NotifierService,
    private router: Router
  ) {}

  ngOnInit() {}

  initializeRegisterForm() {
    return (this.registerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    }));
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const registerRequest: RegisterRequest = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.loading = true;
    this.registerSubscription = this.authService
      .register(registerRequest)
      .subscribe(
        (next) => {
          this.loading = false;
          console.log('Registration successful');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.loading = false;
          console.error('Registration failed: ', error);
          debugger
          this._notifierService.notify('error', 'Registration failed: \n'+ error.error)
        }
      );
  }

  ngOnDestroy(): void {
    this.registerSubscription.unsubscribe();
  }
}
