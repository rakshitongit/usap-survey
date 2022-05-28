import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Coordinates, Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';

import { Storage } from '@ionic/storage-angular';
import { SurveyData } from '../pages/survey/survey.component';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private _storage: Storage | null = null;

    constructor(private storage: Storage, private permissions: AndroidPermissions, private locationAccuracy: LocationAccuracy, private geolocation: Geolocation) {
        this.init();
    }

    async init() {
        // If using, define drivers here: await this.storage.defineDriver(/*...*/);
        const storage = await this.storage.create();
        this._storage = storage;
    }

    // Create and expose methods that users of this service can
    // call, for example:
    public async set(key: string, value: any) {
        if (this._storage == null) {
            await this.init()
        }
        return this._storage?.set(key, value);
    }

    public async get(key: string) {
        if (this._storage == null) {
            await this.init()
        }
        return this._storage?.get(key);
    }

    public async logout() {
        if (this._storage == null) {
            await this.init()
        }
        return this._storage.clear()
    }

    public async setHistory(survey: SurveyData) {
        surveyData = await this.getHistory()
        if (!surveyData) {
            surveyData = []
        }
        surveyData.push(survey)
        return this.set(StorageKeys.SURVEYS, surveyData)
    }

    public async getHistory(): Promise<SurveyData[]> {
        return this.get(StorageKeys.SURVEYS)
    }

    async checkGPSPermissions() {
        const per = await this.permissions.checkPermission(this.permissions.PERMISSION.ACCESS_COARSE_LOCATION)
        if (per.hasPermission) {
            await this.requestGPSData()
        } else {
            await this.getPermissions()
        }
    }

    private async getPermissions() {
        const canRequest: boolean = await this.locationAccuracy.canRequest()
        if (!canRequest) {
            await this.permissions.requestPermission(this.permissions.PERMISSION.ACCESS_COARSE_LOCATION)
            await this.requestGPSData()
        }
    }

    private async requestGPSData() {
        await this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
        const resp = await this.geolocation.getCurrentPosition()
        locationData = resp.coords
    }
}

export enum StorageKeys {
    USER = 'user', SURVEYS = 'surveys', DAILY_SURVEYS = 'daily_surveys'
}

export let surveyData: SurveyData[] = []

export let locationData: Coordinates