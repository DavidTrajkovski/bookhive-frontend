import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Topic } from '../interface/bookclub/topic';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  baseUrl: string = `${environment.apiUrl}/bookshops`;
  constructor(private http: HttpClient) {}

  getTopicById(topicId: string) {}

  getPostsForTopic(topicId: string) {}
}
