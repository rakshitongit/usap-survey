import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private storage: StorageService, private toastController: ToastController) { }

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean | UrlTree> {

        if (!(await this.authService.isLoggedIn())) {
            const toast = await this.toastController.create({
                message: 'Please enter your details to navigate further',
                duration: 2000
            });
            toast.present();
            this.router.navigateByUrl('/myProfile')
        }
        return true;
    }

}
