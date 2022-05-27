import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {

    buttonLoading: boolean = false

    surveyData: SurveyData = new SurveyData()

    surveyForm: FormGroup;

    constructor(private storageService: StorageService, private toastController: ToastController, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.surveyForm = this.formBuilder.group({
            auth_what: ['', [Validators.required]],
            auth_type: ['', [Validators.required]],
            auth_failure: ['', [Validators.required]],
            auth_convinience: ['', [Validators.required]]
        })
    }

    async submitSurvey() {
        const toast = await this.toastController.create({
            duration: 2000
        });
        this.buttonLoading = !this.buttonLoading
        if (this.surveyForm.valid) {
            
            try {
                await this.storageService.setHistory(this.surveyData)
                toast.message = 'Survey submitted successfully!'
                await toast.present()
                this.buttonLoading = !this.buttonLoading
                this.surveyForm.reset()
            } catch {
                toast.message = 'Error while submitting data!'
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

export class SurveyData {
    auth_what: string
    auth_type: string
    auth_failure: string
    auth_convinience: string
}