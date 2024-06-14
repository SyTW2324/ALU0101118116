import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@app/material.module';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [MaterialModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    title: string = 'Avalon';
}
