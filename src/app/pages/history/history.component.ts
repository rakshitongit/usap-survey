import { Component, OnInit } from '@angular/core';
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator/ngx';
import { PDFGeneratorOptions } from '@awesome-cordova-plugins/pdf-generator';
import { StorageKeys, StorageService } from 'src/app/services/storage.service';
import { UserDetails } from '../my-profile/my-profile.component';
import { SurveyData } from '../survey/survey.component';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

    url: string = 'https://www.usenix.org/system/files/conference/soups2016/soups2016-paper-mare.pdf'

    options: PDFGeneratorOptions = {
        documentSize: 'A4',
        type: 'share',
        fileName: '-log-data.pdf'
    }
    surveyData: SurveyData[] = []

    constructor(private pdf: PDFGenerator, private storageService: StorageService) { }

    async ngOnInit() {
        const user: UserDetails = await this.storageService.get(StorageKeys.USER)
        this.surveyData = await this.storageService.getHistory()
        console.log(this.surveyData)
        this.options.fileName = user.name.trim() + this.options.fileName
    }

    async createPdf() {
        await this.pdf.fromData(document.getElementById('print-wrapper').innerHTML, this.options)
    }

}
