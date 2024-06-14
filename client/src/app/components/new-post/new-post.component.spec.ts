import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NewPostComponent } from './new-post.component';
import { provideHttpClient } from '@angular/common/http';

describe('NewPostComponent', () => {
    let component: NewPostComponent;
    let fixture: ComponentFixture<NewPostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                ReactiveFormsModule,
                MaterialModule,
                RouterModule,
                BrowserAnimationsModule,
            ],
            providers: [provideHttpClient()],
        }).compileComponents();

        fixture = TestBed.createComponent(NewPostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
