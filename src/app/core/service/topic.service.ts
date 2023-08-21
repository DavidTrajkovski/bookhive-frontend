import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Topic } from '../interface/bookclub/topic';
import { CreateNewPost } from '../interface/bookclub/create-new-post';
import { Post } from '../interface/bookclub/post';

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

  addPostToTopic(topicId: string, newPost: CreateNewPost): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/${topicId}/posts`, newPost);
  }
}
