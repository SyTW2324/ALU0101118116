import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';

import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [MaterialModule, RouterModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
    username: string | undefined;
    title: string = 'Avalon';

    constructor(
        public auth: AuthService,
        public router: Router,
        public userSvc: UserService
    ) {
        const user = this.auth.getToken();
        if (user)
            this.username = user.username;
        else
            this.username = undefined;
    }

    ngOnInit(): void { }

    logout(): void {
        this.auth.logout();
    }
}
