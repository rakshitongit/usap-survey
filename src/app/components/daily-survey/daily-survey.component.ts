import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toastController } from '@ionic/core';
import { DailySurveyData } from 'src/app/pages/survey/survey.component';
import { StorageService, StorageKeys, locationData } from 'src/app/services/storage.service';

@Component({
    selector: 'app-daily-survey',
    templateUrl: './daily-survey.component.html',
    styleUrls: ['./daily-survey.component.scss'],
})
export class DailySurveyComponent implements OnInit {

    buttonLoading: boolean = false

    surveyData: DailySurveyData = new DailySurveyData()
    latitude: number;
    longitude: number;

    surveyForm: FormGroup;

    constructor(private fb: FormBuilder, private storageService: StorageService) { }

    ngOnInit() {
        this.surveyForm = this.fb.group({
            third_party: ['', Validators.required],
            third_party_trust: ['', Validators.required],
            forgot_to_log: ['', Validators.required],
            no_physical_auths: ['', Validators.required],
            affect_productivity: ['', Validators.required]
        })
    }

    async submitSurvey() {
        const toast = await toastController.create({
            duration: 2000
        })
        this.buttonLoading = !this.buttonLoading
        if (this.surveyForm.valid) {
            try {
                await this.storageService.checkGPSPermissions()
                const data: DailySurveyData = new DailySurveyData()
                data.third_party = this.surveyForm.get('third_party').value
                data.third_party_trust = this.surveyForm.get('third_party_trust').value
                data.no_physical_auths = this.surveyForm.get('no_physical_auths').value
                data.forgot_to_log = this.surveyForm.get('forgot_to_log').value
                data.affect_productivity = this.surveyForm.get('affect_productivity').value
                data.timestamp = Date.now()
                data.latitude = locationData.latitude
                data.longitude = locationData.longitude
                
                let surveys: DailySurveyData[] = await this.storageService.get(StorageKeys.DAILY_SURVEYS)
                if(surveys == null || surveys == undefined) {
                    surveys = []
                }
                console.log(data, surveys)
                surveys.push(data)
                await this.storageService.set(StorageKeys.DAILY_SURVEYS, surveys)
                toast.message = 'Survey submitted successfully!'
                this.buttonLoading = !this.buttonLoading
                await toast.present()
                this.surveyForm.reset()
            } catch(e) {
                console.error(e)
                toast.message = 'Please enable your location!'
                this.buttonLoading = !this.buttonLoading
                await toast.present()
            }
        } else {
            toast.message = 'Please fill all the data before submitting!'
            this.buttonLoading = !this.buttonLoading
            await toast.present()
        }
    }

}
