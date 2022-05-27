import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HistoryComponent } from './pages/history/history.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { SurveyComponent } from './pages/survey/survey.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'survey',
        pathMatch: 'full'
    },
    {
        path: 'survey',
        component: SurveyComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'history',
        component: HistoryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'myProfile',
        component: MyProfileComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
