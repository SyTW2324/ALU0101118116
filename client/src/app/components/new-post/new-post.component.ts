import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { MaterialModule } from '@app/material.module';

import { UserService } from '@services/user.service';
import { PostService } from '@services/post.service';

@Component({
    selector: 'app-new-post',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
    templateUrl: './new-post.component.html',
    styleUrl: './new-post.component.scss',
})
export class NewPostComponent implements OnInit {
    newPostForm: FormGroup;

    constructor(
        private userSvc: UserService,
        private postSvc: PostService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.newPostForm = formBuilder.group({
            title: ['', Validators.required],
            content: ['', Validators.required],
            featured_image: [''],
        });
    }

    ngOnInit(): void {}

    async newPost(): Promise<void> {
        if (this.newPostForm.invalid) return;
        let data = this.newPostForm.value;
        let user = await this.userSvc.getCurrentUser();
        data.author = user.username;
        try {
            await lastValueFrom(this.postSvc.postPost(data));
            this.router.navigate(['/']);
        } catch (err) {
            console.error(err);
        }
    }
}
