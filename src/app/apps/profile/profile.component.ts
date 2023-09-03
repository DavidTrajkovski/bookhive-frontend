import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ProfileService} from "../../core/service/authorization/profile.service";
import {ProfileRequest} from "../../core/interface/authorization/profile-request";
import {NotifierService} from "angular-notifier";
import {User} from "../../core/interface/user";

@Component({
  selector: 'bh-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy{
  profileForm: FormGroup = this.initializeProfileForm();
  profileSubscription = new Subscription();
  loading: boolean = false;

  user: User = { id: '', firstName: '', lastName: '', address: '' };
  constructor(
    private _formBuilder: FormBuilder,
    private _profileService: ProfileService,
    private _notifierService: NotifierService,
  ) {}

  ngOnInit(): void {
    this.getAuthenticatedUserDetails();
  }

  getAuthenticatedUserDetails(){
    this.loading = true;
    this._profileService.getAuthenticatedUserDetails().subscribe(response => {
      this.user = response;
      this.populateForm();
    });
  }
  initializeProfileForm() {
    return (this.profileForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', [Validators.required]],
      password: [''],
      confirmPassword: [''],
    }));
  }

  populateForm() {
      this.profileForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        address: this.user.address,
      });
    this.loading = false;
  }

  onSubmit() {
    this.loading = true;

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
          this._notifierService.notify('success', 'Profile updated successfully');
          this.loading = false;
        },
        (error) => {
          console.error('Profile update failed: ', error);
          this._notifierService.notify('error', 'Error while editing profile info');
          this.loading = false;
        }
      );
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
  }


}
