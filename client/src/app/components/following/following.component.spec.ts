import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '@services/auth.service';
import { MaterialModule } from '@app/material.module';
import { FollowingComponent } from '@components/following/following.component';

describe('FollowingComponent', () => {
    let component: FollowingComponent;
    let fixture: ComponentFixture<FollowingComponent>;
    let authService: AuthService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, RouterModule, MaterialModule],
            providers: [provideHttpClient(), AuthService],
        }).compileComponents();

        fixture = TestBed.createComponent(FollowingComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
