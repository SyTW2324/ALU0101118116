import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

import { AuthService } from '@services/auth.service';
import { MaterialModule } from '@app/material.module';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
    hide: boolean = true;
    signInForm: FormGroup;
    error_message: string = '\u00A0';

    formFields = [
        { label: 'Email', name: 'email' },
        { label: 'Password', name: 'password' },
    ];

    constructor(
        private auth: AuthService,
        private router: Router,
        formBuilder: FormBuilder
    ) {
        this.signInForm = formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    ngOnInit(): void {}

    signIn(): void {
        if (this.signInForm.invalid) {
            this.error_message = 'Username or password is incorrect';
            return;
        }

        this.auth.signIn(this.signInForm.value).subscribe({
            next: (response: any) => {
                localStorage.setItem('token', response.token);
                this.router.navigate(['/']).then(() => {
                    window.location.reload();
                });
            },
            error: (error: any) => {
                this.error_message = error.error.message;
                console.log(error);
            },
        });
    }
}
