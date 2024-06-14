import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { SignInComponent } from '@components/auth/sign-in/sign-in.component';
import { SignUpComponent } from '@components/auth/sign-up/sign-up.component';
import { HomeComponent } from '@components/home/home.component';
import { PostsListComponent } from '@components/posts-list/posts-list.component';
import { FollowingComponent } from '@components/following/following.component';
import { ProfileComponent } from '@components/profile/profile.component';
import { AuthGuard } from '@guards/auth.guard';
import { SettingsComponent } from './components/settings/settings.component';
import { NewPostComponent } from './components/new-post/new-post.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    {
        path: 'profile/:username',
        component: ProfileComponent,
        canActivate: [AuthGuard],
    },
    { path: 'new-post', component: NewPostComponent, canActivate: [AuthGuard] },
    { path: 'posts', component: PostsListComponent, canActivate: [AuthGuard] },
    {
        path: 'following',
        component: FollowingComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard],
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule],
    exports: [RouterModule, RouterOutlet],
})
export class AppRoutingModule {}
