import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';

import { AuthService } from '@services/auth.service';
import { UserService } from '@app/services/user.service';
import { SERVER_URL } from '@utils/app.constants';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        RouterOutlet,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
    token: any;
    user: any = {};
    editing: boolean = false;
    profileImage: string | ArrayBuffer | null = 'default-profile-image.jpg';
    file: File | null = null;

    constructor(
        public auth: AuthService,
        public router: Router,
        public userSvc: UserService
    ) {}

    async ngOnInit(): Promise<void> {
        this.user = await this.userSvc.getCurrentUser();
        if (!this.user.profileImage)
            this.profileImage = 'default-profile-image.jpg';
        else this.profileImage = `${SERVER_URL}${this.user.profileImage}`;
    }

    onFileSelected(event: Event): void {
        const target = event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        this.file = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.profileImage = e.target.result;
        };
        reader.readAsDataURL(this.file);
    }

    editProfileImage(): void {
        if (this.editing) document.getElementById('fileInput')?.click();
    }

    async save(): Promise<void> {
        this.editing = false;
        let data = new FormData();
        for (let key in this.user) data.append(key, this.user[key]);
        this.userSvc
            .patchUser(this.user._id, data, this.file as File)
            .subscribe({
                next: (response: any) => {
                    window.location.reload();
                },
                error: (error: any) => {
                    console.log(error);
                },
            });
    }

    cancel(): void {
        this.editing = false;
    }
}
