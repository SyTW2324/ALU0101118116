import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { provideHttpClient } from '@angular/common/http';

import { PostsListComponent } from './posts-list.component';

describe('PostsListComponent', () => {
    let component: PostsListComponent;
    let fixture: ComponentFixture<PostsListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, MaterialModule, RouterModule],
            providers: [provideHttpClient()],
        }).compileComponents();

        fixture = TestBed.createComponent(PostsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
