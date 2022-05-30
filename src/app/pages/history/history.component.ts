import { Component, OnInit } from '@angular/core';
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator/ngx';
import { PDFGeneratorOptions } from '@awesome-cordova-plugins/pdf-generator';
import { StorageKeys, StorageService } from 'src/app/services/storage.service';
import { UserDetails } from '../my-profile/my-profile.component';
import { DailySurveyData, SurveyData } from '../survey/survey.component';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Papa } from 'ngx-papaparse';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

    url: string = 'https://www.usenix.org/system/files/conference/soups2016/soups2016-paper-mare.pdf'

    options: PDFGeneratorOptions = {
        documentSize: 'A4',
        landscape: 'landscape',
        type: 'share',
        fileName: '-log-data'
    }
    surveyData: SurveyData[] = []

    dailyData: DailySurveyData[] = []

    constructor(private pdf: PDFGenerator, private storageService: StorageService, private file: File, private papa: Papa, private social: SocialSharing) { }

    async ngOnInit() {
        const user: UserDetails = await this.storageService.get(StorageKeys.USER)
        this.surveyData = await this.storageService.getHistory()
        const ds = await this.storageService.get(StorageKeys.DAILY_SURVEYS)
        if (ds != null || ds != undefined) {
            this.dailyData = ds
        }
        console.log(this.surveyData)
        this.options.fileName = user.name.trim() + '-' + user.firstName.trim() + this.options.fileName
    }

    async createPdf() {
        const csv = this.papa.unparse({
            fields: Object.keys(this.surveyData[0]),
            data: this.surveyData
        });
        const res = await this.file.writeFile(this.file.dataDirectory, this.options.fileName + '.csv', csv, { replace: true })
        await this.social.share('Sharing Survey data', null, res.nativeURL, null)
        await this.pdf.fromData(document.getElementById('print-wrapper').innerHTML, this.options)
    }

}
