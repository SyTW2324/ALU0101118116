import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PostInterface } from '@shared/interfaces/post.interface';
import { SERVER_URL } from 'src/utils/app.constants';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private postURL = `${SERVER_URL}/posts`;

    constructor(private http: HttpClient) {}

    getPosts(): Observable<PostInterface[]> {
        return this.http.get<PostInterface[]>(this.postURL);
    }

    getPost(id: string): Observable<PostInterface> {
        return this.http.get<PostInterface>(`${this.postURL}/${id}`);
    }

    postPost(formData: FormData): Observable<PostInterface> {
        return this.http.post<PostInterface>(this.postURL, formData);
    }

    deletePost(id: string): Observable<PostInterface> {
        return this.http.delete<PostInterface>(`${this.postURL}/${id}`);
    }

    patchPost(id: string, formData: FormData): Observable<PostInterface> {
        return this.http.patch<PostInterface>(`${this.postURL}/${id}`, formData);
    }

    getFeed(users: string[]): Observable<PostInterface[]> {
        return this.http.get<PostInterface[]>(`${SERVER_URL}/feed`, {
            params: { users },
        });
    }
}
