import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    template: '',
})
export class LogoutComponent implements OnInit {

    constructor(private storageService: StorageService, private router: Router, private toastController: ToastController) { }

    async ngOnInit() {
        await this.storageService.logout()
        const toast = await this.toastController.create({
            message: 'Logout Successful!',
            duration: 2000
        });
        toast.present();
        this.router.navigateByUrl('/myProfile')
    }

}
