import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { ToastController } from '@ionic/angular';
import { SurveyData } from 'src/app/pages/survey/survey.component';
import { locationData, StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-main-survey',
    templateUrl: './main-survey.component.html',
    styleUrls: ['./main-survey.component.scss'],
})
export class MainSurveyComponent implements OnInit {

    buttonLoading: boolean = false

    surveyData: SurveyData = new SurveyData()

    surveyForm: FormGroup;

    constructor(private storageService: StorageService, private toastController: ToastController, private formBuilder: FormBuilder, private geolocation: Geolocation, private permissions: AndroidPermissions, private locationAccuracy: LocationAccuracy) { }

    async ngOnInit() {
        this.surveyForm = this.formBuilder.group({
            auth_what: ['', [Validators.required]],
            auth_type: ['', [Validators.required]],
            auth_failure: ['', [Validators.required]],
            auth_convinience: ['', [Validators.required]]
        })
        this.storageService.checkGPSPermissions()
    }

    async submitSurvey() {
        const toast = await this.toastController.create({
            duration: 2000
        });
        this.buttonLoading = !this.buttonLoading
        if (this.surveyForm.valid) {
            try {
                await this.storageService.checkGPSPermissions()
                this.surveyData.timestamp = Date.now()
                this.surveyData.latitude = locationData.latitude
                this.surveyData.longitude = locationData.longitude
                await this.storageService.setHistory(this.surveyData)
                toast.message = 'Survey submitted successfully!'
                await toast.present()
                this.buttonLoading = !this.buttonLoading
                this.surveyForm.reset()
            } catch(e) {
                console.error(e)
                toast.message = 'Please enable your location!'
                await toast.present()
                this.buttonLoading = !this.buttonLoading
            }
        } else {
            toast.message = 'Please fill all the data before submitting!'
            await toast.present()
            this.buttonLoading = !this.buttonLoading
        }
    }

}
