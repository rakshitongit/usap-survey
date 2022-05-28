import { Component, OnInit } from '@angular/core';
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator/ngx';
import { PDFGeneratorOptions } from '@awesome-cordova-plugins/pdf-generator';
import { StorageKeys, StorageService } from 'src/app/services/storage.service';
import { UserDetails } from '../my-profile/my-profile.component';
import { DailySurveyData, SurveyData } from '../survey/survey.component';
import _ from 'lodash';

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
        fileName: '-log-data.pdf'
    }
    surveyData: SurveyData[] = []

    dailyData: DailySurveyData[] = []

    constructor(private pdf: PDFGenerator, private storageService: StorageService) { }

    async ngOnInit() {
        const user: UserDetails = await this.storageService.get(StorageKeys.USER)
        this.surveyData = await this.storageService.getHistory()
        const ds = await this.storageService.get(StorageKeys.DAILY_SURVEYS)
        if(ds != null || ds != undefined) {
            this.dailyData = ds
        }
        console.log(this.surveyData)
        this.options.fileName = user.name.trim() + '-' + user.firstName.trim() + this.options.fileName
    }

    async createPdf() {
        let temp = '<head><link rel="stylesheet" href="<%=css_file%>"></head><body>'
        let payload = _.template(temp + document.getElementById('print-wrapper').innerHTML + '</body>')
        const cssFile = './styles.css'
        await this.pdf.fromData(payload({ css_file: cssFile }), this.options)
    }

}
