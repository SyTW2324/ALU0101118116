import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { PostInterface } from '@shared/interfaces/post.interface';
import { UserService } from '@services/user.service';
import { PostService } from '@services/post.service';
import { AuthService } from '@services/auth.service';
import { MaterialModule } from '@app/material.module';

import { SERVER_URL } from '@utils/app.constants';
@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, MaterialModule, RouterModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    token: any;
    user: any = {};
    feed: any[] = [];

    constructor(
        private userSvc: UserService,
        private postSvc: PostService
    ) {}

    ngOnInit(): void {
        this.userSvc.getCurrentUser().then(user => {
            if (user.following.length > 0)
                this.postSvc
                    .getFeed(user.following)
                    .subscribe((posts: PostInterface[]) => {
                        this.feed = posts;
                        this.feed.forEach(post => {
                            this.userSvc
                                .getProfile(post.author)
                                .subscribe(profile => {
                                    post.profileImage = profile.profileImage
                                        ? `${SERVER_URL}${profile.profileImage}`
                                        : 'default-profile-image.jpg';
                                });
                        });
                        this.feed.sort(
                            (a, b) =>
                                new Date(b.created_at).getTime() -
                                new Date(a.created_at).getTime()
                        );
                    });
        });
    }

    getProfileImage(user: string): any {
        this.userSvc.getProfile(user).subscribe(user => {
            if (user && user.profileImage)
                return `${SERVER_URL}${user.profileImage}`;
            return 'default-profile-image.jpg';
        });
    }
}
