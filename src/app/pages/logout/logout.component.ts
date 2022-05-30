import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    template: '',
})
export class LogoutComponent implements OnInit, OnChanges, OnDestroy {

    constructor(private storageService: StorageService, private router: Router, private toastController: ToastController) { }
    
    ngOnDestroy(): void {
        this.logout()
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        this.logout()
    }

    ngOnInit() {
        this.logout()
    }

    async logout() {
        console.log('Logout')
        await this.storageService.logout()
        const toast = await this.toastController.create({
            message: 'Logout Successful!',
            duration: 2000
        });
        toast.present();
        this.router.navigateByUrl('/myProfile')
    }

}
