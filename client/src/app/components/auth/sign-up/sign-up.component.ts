import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
    AbstractControlOptions,
} from '@angular/forms';

import { AuthService } from '@services/auth.service';
import { MaterialModule } from '@app/material.module';

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
    hide: boolean = true;
    signUpForm: FormGroup;
    error_message: string = '\u00A0';

    constructor(
        private auth: AuthService,
        private router: Router,
        formBuilder: FormBuilder
    ) {
        this.signUpForm = formBuilder.group(
            {
                username: ['', Validators.required],
                first_name: ['', Validators.required],
                last_name: ['', Validators.required],
                email: ['', Validators.required],
                phone_number: ['', Validators.required],
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required],
            },
            { validators: this.passwordValidator } as AbstractControlOptions
        );
    }

    ngOnInit(): void {}

    signUp(): void {
        if (this.signUpForm.invalid) {
            this.error_message = 'Please fill out all required fields';
            return;
        }

        this.auth.signUp(this.signUpForm.value).subscribe({
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

    passwordValidator(form: FormGroup) {
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');

        password?.value !== confirmPassword?.value
            ? confirmPassword?.setErrors({ passwordMismatch: true })
            : confirmPassword?.setErrors(null);
    }
}
