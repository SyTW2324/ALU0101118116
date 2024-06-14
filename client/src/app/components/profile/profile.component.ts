import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { lastValueFrom } from 'rxjs';
import { SERVER_URL } from '@utils/app.constants';

import { UserService } from '@services/user.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RouterModule, MaterialModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
    user: any = {};
    myProfile = false;
    following = false;
    profileImage: string | ArrayBuffer | null = 'default-profile-image.jpg';

    constructor(
        private userSvc: UserService,
        private route: ActivatedRoute
    ) {}

    async ngOnInit(): Promise<void> {
        const username = this.route.snapshot.paramMap.get('username');
        const currentUser = await this.userSvc.getCurrentUser();
        if (username && username !== currentUser.username) {
            lastValueFrom(this.userSvc.getProfile(username)).then(
                async user => {
                    this.user = user;
                    if (!this.user.profileImage)
                        this.profileImage = 'default-profile-image.jpg';
                    else
                        this.profileImage = `${SERVER_URL}${this.user.profileImage}`;
                    await this.userSvc
                        .isFollowing(this.user.username)
                        .then(following => {
                            this.following = following;
                        });
                }
            );
        } else {
            this.userSvc.getCurrentUser().then(user_data => {
                lastValueFrom(this.userSvc.getProfile(user_data.username)).then(
                    user => {
                        this.myProfile = true;
                        this.user = user;
                        if (!this.user.profileImage)
                            this.profileImage = 'default-profile-image.jpg';
                        else
                            this.profileImage = `${SERVER_URL}${this.user.profileImage}`;
                    }
                );
            });
        }
    }

    async followUser(): Promise<void> {
        if (this.user.username) {
            await this.userSvc.follow(this.user.username);
            this.following = true;
        }
    }

    async unfollowUser(): Promise<void> {
        if (this.user.username) {
            await this.userSvc.unfollow(this.user.username);
            this.following = false;
        }
    }
}
