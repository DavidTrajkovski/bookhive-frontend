import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterRequest } from '../../core/interface/authorization/register-request';
import { RegisterService } from '../../core/service/authorization/register.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  registerForm: FormGroup = this.initializeRegisterForm();
  registerSubscription = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _registerService: RegisterService
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

    this.registerSubscription = this._registerService
      .register(registerRequest)
      .subscribe(
        (next) => {
          console.log('Registration successful');
        },
        (error) => {
          console.error('Registration failed: ', error);
        }
      );
  }

  ngOnDestroy(): void {
    this.registerSubscription.unsubscribe();
  }
}
