import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() { }

    createUser() {
        console.log(this.user)
        this.authService.login(this.user)
        this.buttonLoading = !this.buttonLoading
        setTimeout(() => {
            this.router.navigateByUrl('/survey')
        }, 1000)
    }

}

export class UserDetails {
    name: string
    firstName: string
    age: number
    gender: Gender
    department: string
    qualification: string
}

enum Gender {
    MALE, FEMALE
}