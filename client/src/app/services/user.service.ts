import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { UserInterface } from '@shared/interfaces/user.interface';
import { SERVER_URL } from 'src/utils/app.constants';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private userURL = `${SERVER_URL}/users`;

    constructor(
        private http: HttpClient,
        private auth: AuthService
    ) {}

    private getUsers(): Observable<UserInterface[]> {
        return this.http.get<UserInterface[]>(this.userURL);
    }

    private getUser(id: string): Observable<UserInterface> {
        return this.http.get<UserInterface>(`${this.userURL}/${id}`);
    }

    getProfile(username: string): Observable<UserInterface> {
        return this.http.get<UserInterface>(`${this.userURL}/username/${username}`);
    }

    deleteUser(id: string): Observable<UserInterface> {
        return this.http.delete<UserInterface>(`${this.userURL}/${id}`);
    }

    patchUser(id: string, formData: FormData, file?: File): Observable<UserInterface> {
        if (file) formData.append('file', file, file.name);
        return this.http.patch<UserInterface>(`${this.userURL}/${id}`, formData);
    }

    async getCurrentUser(): Promise<any> {
        let token = this.auth.getToken();
        token = jwtDecode(token);
        if (token && token.id) {
            const user = await lastValueFrom(this.getUser(token.id));
            return user;
        } else return null;
    }

    getProfileImage(user: string): string {
        this.getProfile(user).subscribe(user => {
            if (user && user.profileImage)
                return `${SERVER_URL}${user.profileImage}`;
            return 'default-profile-image.jpg';
        });
        return 'default-profile-image.jpg';
    }

    async getFollowing(id: string): Promise<string[] | undefined> {
        const user = await lastValueFrom(this.getUser(id));
        return user.following;
    }

    async isFollowing(username: string): Promise<boolean> {
        let isFollowing = false;
        await this.getCurrentUser().then(user => {
            if (user && user.following)
                isFollowing = user.following.includes(username);
        });
        return isFollowing;
    }

    async follow(username: string): Promise<void> {
        await this.getCurrentUser().then(async user => {
            if (user) {
                user.following.push(username);
                this.patchUser(user._id, user).subscribe({
                    next: (response: any) => {
                        return;
                    },
                    error: (error: any) => {
                        console.log(error);
                    },
                });
            }
        });
        return;
    }

    async unfollow(username: string): Promise<void> {
        await this.getCurrentUser().then(async user => {
            if (user) {
                user.following = user.following.filter(
                    (following: string) => following !== username
                );
                this.patchUser(user._id, user).subscribe({
                    next: (response: any) => {
                        return;
                    },
                    error: (error: any) => {
                        console.log(error);
                    },
                });
            }
        });
        return;
    }
}
