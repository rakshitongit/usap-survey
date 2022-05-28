import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {

    user: UserDetails = new UserDetails()

    buttonLoading: boolean = false

    customOptions: any = {
        header: 'Department',
        subHeader: 'Select your department'
    };

    profileForm: FormGroup

    constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private toastController: ToastController) { }

    async ngOnInit() {
        this.profileForm = this.fb.group({
            name: ['', Validators.required],
            firstName: ['', Validators.required],
            age: ['', Validators.required],
            gender: ['', Validators.required],
            university: ['', Validators.required],
            department: ['', Validators.required],
            qualification: ['', Validators.required]
        })
        // Get profile if available
        const u: UserDetails = await this.authService.getLoginData()
        if (u != undefined || null) {
            this.user = u;
        }
    }

    async createUser() {
        this.buttonLoading = !this.buttonLoading
        const toast = await this.toastController.create({
            duration: 2000
        });
        if (this.profileForm.valid) {
            this.authService.login(this.user)
            setTimeout(async () => {
                this.router.navigateByUrl('')
                this.buttonLoading = !this.buttonLoading
                toast.message = 'Profile submitted successfully!'
                await toast.present()
            }, 1000)
        } else {
            toast.message = 'Entered data is not valid!'
            await toast.present()
            this.buttonLoading = !this.buttonLoading
        }

    }

}

export class UserDetails {
    name: string
    firstName: string
    age: number
    gender: Gender
    university: string
    department: string
    qualification: string
}

enum Gender {
    MALE, FEMALE
}