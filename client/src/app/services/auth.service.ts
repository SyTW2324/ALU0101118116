import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SERVER_URL } from 'src/utils/app.constants';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private signUpUrl = `${SERVER_URL}/sign-up`;
    private signInUrl = `${SERVER_URL}/sign-in`;

    constructor(private http: HttpClient) {}

    signUp(userData: FormData) {
        return this.http.post<any>(this.signUpUrl, userData);
    }

    signIn(user: any) {
        return this.http.post<any>(this.signInUrl, user);
    }

    loggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken(): any {
        return localStorage.getItem('token');
    }

    logout(): void {
        localStorage.removeItem('token');
        window.location.reload();
    }
}
