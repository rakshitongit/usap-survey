import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DailySurveyComponent } from './components/daily-survey/daily-survey.component';
import { DailyComponent } from './components/history/daily/daily.component';
import { MainComponent } from './components/history/main/main.component';
import { MainSurveyComponent } from './components/main-survey/main-survey.component';
import { AuthGuard } from './guards/auth.guard';
import { HistoryComponent } from './pages/history/history.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { SurveyComponent } from './pages/survey/survey.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'survey/main',
        pathMatch: 'full'
    },
    {
        path: 'survey',
        component: SurveyComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'main',
                component: MainSurveyComponent
            },
            {
                path: 'daily',
                component: DailySurveyComponent
            }
        ]
    },
    {
        path: 'history',
        component: HistoryComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'main',
                component: MainComponent
            },
            {
                path: 'daily',
                component: DailyComponent
            }
        ]
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
