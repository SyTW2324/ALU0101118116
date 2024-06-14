import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';

import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

import { SERVER_URL } from '@utils/app.constants';

@Component({
    selector: 'app-following',
    standalone: true,
    imports: [CommonModule, RouterModule, MaterialModule],
    templateUrl: './following.component.html',
    styleUrl: './following.component.scss',
})
export class FollowingComponent implements OnInit {
    user: any = {};
    following: any[] = [];

    constructor(
        private auth: AuthService,
        private userSvc: UserService
    ) { }

    async ngOnInit(): Promise<void> {
        this.user = await this.userSvc.getCurrentUser();
        await this.getFollowing();
    }

    async getFollowing(): Promise<void> {
        let followingProfiles = [];
        let following = await this.userSvc.getFollowing(this.user._id);
        if (following) {
            for (let i = 0; i < following.length; i++) {
                await this.userSvc.getProfile(following[i]).subscribe(profile => {
                    this.following.push({ username: following[i], profileImage: `${SERVER_URL}${profile.profileImage}` });
                });
            }
        }
    }
}
