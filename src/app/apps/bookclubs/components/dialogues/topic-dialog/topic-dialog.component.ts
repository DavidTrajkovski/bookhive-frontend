import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CreateTopicRequest } from 'src/app/core/interface/bookclub/create-topic-request';
import { TopicDetails } from 'src/app/core/interface/bookclub/topic-details';
import { AuthService } from 'src/app/core/service/authentication/auth.service';
import { TopicService } from 'src/app/core/service/topic.service';

@Component({
  selector: 'bh-topic-dialog',
  templateUrl: './topic-dialog.component.html',
  styleUrls: ['./topic-dialog.component.scss'],
})
export class TopicDialog {
  bookclubId: string = '';
  topic: TopicDetails | null = null;
  topicForm: FormGroup = this.initializeForm();
  topicSubscription = new Subscription();
  isLoading: boolean = true;

  constructor(
    private _dialogRef: MatDialogRef<TopicDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: { topicId: string | null; bookclubId: string },
    private _topicService: TopicService,
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initLogic();
  }

  initLogic() {
    if (this.data.topicId != null) {
      this._topicService.getTopicById(this.data.topicId).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.topic = {
            topicId: data.id,
            bookclubId: data.bookclubId,
            creatorId: this._authService.getUserId()!,
            title: data.title,
          };
          this.prepopulateTopicForm(this.topic);
        },
        error: (err) => console.error(err),
      });
    } else {
      this.isLoading = false;
      this.initializeForm();
    }
    this.bookclubId = this.data.bookclubId;
  }

  initializeForm() {
    return (this.topicForm = this._formBuilder.group({
      title: ['', Validators.required],
    }));
  }

  prepopulateTopicForm(topic: TopicDetails) {
    this.topicForm.setValue({
      title: topic.title,
    });
  }

  onSubmit() {
    if (this.topicForm.invalid) return;

    const topicRequest = this.createTopicRequestObj();
    if (this.data.topicId == null) {
      this.createTopic(topicRequest);
    } else {
      this.editTopic(topicRequest);
    }
  }

  createTopic(topicRequest: CreateTopicRequest) {
    this.topicSubscription = this._topicService
      .createTopic(topicRequest)
      .subscribe({
        next: (_) => this._dialogRef.close(),
        error: (err) => console.error(err),
      });
  }

  editTopic(topicRequest: CreateTopicRequest) {
    this.topicSubscription = this._topicService
      .editTopic(this.topic?.topicId!, topicRequest)
      .subscribe({
        next: (_) => this._dialogRef.close(),
        error: (err) => console.error(err),
      });
  }

  createTopicRequestObj(): CreateTopicRequest {
    return {
      bookclubId: this.bookclubId,
      creatorId: this._authService.getUserId()!,
      title: this.topicForm.value.title,
    };
  }

  onCancel() {
    this._dialogRef.close();
  }

  getSubmitButtonText() {
    if (this.data.topicId != null) {
      return 'Save';
    } else {
      return 'Create';
    }
  }
}
