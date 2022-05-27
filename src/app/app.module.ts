import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Drivers } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SurveyComponent } from './pages/survey/survey.component';
import { HistoryComponent } from './pages/history/history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator/ngx';


@NgModule({
    declarations: [AppComponent, SurveyComponent, HistoryComponent, MyProfileComponent, LogoutComponent],
    entryComponents: [SurveyComponent, HistoryComponent, MyProfileComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, IonicStorageModule.forRoot({
        name: '_mydb',
        driverOrder: [Drivers.LocalStorage]
    }),
    ReactiveFormsModule
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        SocialSharing,
        PDFGenerator
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
