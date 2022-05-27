import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { SurveyData } from '../pages/survey/survey.component';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private _storage: Storage | null = null;

    constructor(private storage: Storage) {
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
        if(this._storage == null) {
            await this.init()
        }
        this._storage?.set(key, value);
    }

    public async get(key: string) {
        if(this._storage == null) {
            await this.init()
        }
        return this._storage?.get(key);
    }

    public async logout() {
        if(this._storage == null) {
            await this.init()
        }
        return this._storage.clear()
    }

    public async setHistory(survey: SurveyData) {
        surveyData = await this.get('surveys')
        if(!surveyData) {
            surveyData = []
        }
        surveyData.push(survey)
        return this.set('surveys', surveyData)
    }

    public async getHistory(): Promise<SurveyData[]> {
        return this.get('surveys')
    }
}

export enum StorageKeys {
    USER = 'user'
}

export let surveyData: SurveyData [] = []