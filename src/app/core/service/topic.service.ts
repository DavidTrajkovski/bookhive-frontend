import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Topic } from '../interface/bookclub/topic';
import { CreateNewPost } from '../interface/bookclub/create-new-post';
import { Post } from '../interface/bookclub/post';
import { CreateTopicRequest } from '../interface/bookclub/create-topic-request';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  baseUrl: string = `${environment.apiUrl}/topics`;
  constructor(private http: HttpClient) {}

  getTopicById(topicId: string): Observable<Topic> {
    return this.http.get<Topic>(`${this.baseUrl}/${topicId}`);
  }

  getPostsForTopic(topicId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/${topicId}/posts`);
  }

  createTopic(createTopicRequest: CreateTopicRequest): Observable<Topic> {
    console.log(createTopicRequest);
    return this.http.post<Topic>(this.baseUrl, createTopicRequest);
  }

  editTopic(
    topicId: string,
    createTopicRequest: CreateTopicRequest
  ): Observable<Topic> {
    return this.http.put<Topic>(
      `${this.baseUrl}/${topicId}`,
      createTopicRequest
    );
  }

  addPostToTopic(topicId: string, newPost: CreateNewPost): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/${topicId}/posts`, newPost);
  }
}
