import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Drivers, Storage } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SurveyComponent } from './pages/survey/survey.component';
import { HistoryComponent } from './pages/history/history.component';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';

@NgModule({
    declarations: [AppComponent, SurveyComponent, HistoryComponent, MyProfileComponent],
    entryComponents: [SurveyComponent, HistoryComponent, MyProfileComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, IonicStorageModule.forRoot({
        name: '_mydb',
        driverOrder: [Drivers.LocalStorage]
    })
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent],
})
export class AppModule { }
