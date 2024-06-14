import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';

import { PostInterface } from '@shared/interfaces/post.interface';
import { PostService } from '@services/post.service';
import { UserService } from '@services/user.service';

import { SERVER_URL } from '@utils/app.constants';

@Component({
    selector: 'app-posts-list',
    standalone: true,
    imports: [CommonModule, MaterialModule, RouterModule],
    templateUrl: './posts-list.component.html',
    styleUrl: './posts-list.component.scss',
})
export class PostsListComponent implements OnInit {
    posts: any[] = [];

    constructor(
        private postSvc: PostService,
        private userSvc: UserService
    ) {}

    ngOnInit(): void {
        this.postSvc.getPosts().subscribe((result: PostInterface[]) => {
            this.posts = result;
            this.posts.forEach(element => {
                this.userSvc.getProfile(element.author).subscribe(user => {
                    element.profileImage = user.profileImage
                        ? `${SERVER_URL}${user.profileImage}`
                        : 'default-profile-image.jpg';
                });
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
