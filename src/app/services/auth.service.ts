import { Injectable } from '@angular/core';
import { StorageKeys, StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private storageService: StorageService) {
    }


    public async login() {
        this.storageService.set(StorageKeys.USER, 'user')
        console.log(await this.storageService.get(StorageKeys.USER))
    }

    public async isLoggedIn(): Promise<boolean> {
        console.log(await this.storageService.get(StorageKeys.USER))
        if(await this.storageService.get(StorageKeys.USER) != undefined) {
            return true
        }
        return false
    }

}


