import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { AppComponent } from '@app/app.component';
import { AuthService } from '@services/auth.service';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let authService: AuthService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, RouterOutlet],
            providers: [AuthService, provideHttpClient()],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        fixture.detectChanges();
    }));

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });
    it(`should have the 'Avalon' title`, () => {
        expect(component.title).toEqual('Avalon');
    });
});
