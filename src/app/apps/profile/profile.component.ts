import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ProfileService} from "../../core/service/authorization/profile.service";
import {ProfileRequest} from "../../core/interface/authorization/profile-request";

@Component({
  selector: 'bh-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileForm: FormGroup = this.initializeProfileForm();
  profileSubscription = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _profileService: ProfileService
  ) {}

  initializeProfileForm() {
    return (this.profileForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', [Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],

    }));
  }

  onSubmit() {
    console.log("onsubmit clicked");
    if (this.profileForm.invalid) {
      return;
    }
    console.log("validation passed");
    const profileRequest: ProfileRequest = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      address: this.profileForm.value.address,
      password: this.profileForm.value.password,
      confirmPassword: this.profileForm.value.confirmPassword,
    };

    this.profileSubscription = this._profileService
      .updateProfile(profileRequest)
      .subscribe(
        (next) => {
          console.log('Profile update is successful');
        },
        (error) => {
          console.error('Profile update failed: ', error);
        }
      );
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
  }


}
