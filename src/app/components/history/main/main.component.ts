import { Component, OnInit } from '@angular/core';
import { PDFGeneratorOptions } from '@awesome-cordova-plugins/pdf-generator/ngx';
import { Platform } from '@ionic/angular';
import { UserDetails } from 'src/app/pages/my-profile/my-profile.component';
import { SurveyData } from 'src/app/pages/survey/survey.component';
import { StorageKeys, StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

    options: PDFGeneratorOptions = {
        documentSize: 'A4',
        landscape: 'landscape',
        type: 'share',
        fileName: '-survey-log-data'
    }
    surveyData: SurveyData[] = []

    user: UserDetails

    constructor(private storageService: StorageService, private plt: Platform) { }

    async ngOnInit() {
        this.user = await this.storageService.get(StorageKeys.USER)
        this.surveyData = await this.storageService.getHistory()
    }

    async downloadData() {
        const fileName: string = this.user.name.trim() + '-' + this.user.firstName.trim() + this.options.fileName + '.csv'
        if(this.plt.is('android') || this.plt.is('cordova')) {
            await this.storageService.shareCSVData(Object.keys(this.surveyData[0]), this.surveyData, fileName)
        } else {
            this.storageService.exportAsCSV(this.surveyData, [], fileName)
        }
        
    }

}
