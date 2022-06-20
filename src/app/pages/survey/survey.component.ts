import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {


    constructor() { }

    ngOnInit() { }


}

export class AbstractData {
    latitude: number
    longitude: number
    timestamp: number
}

export class SurveyData extends AbstractData {
    auth_what: string
    auth_type: string
    auth_failure: string
    auth_convinience: string
}

export class DailySurveyData extends AbstractData {
    third_party: string
    third_party_trust: string
    forgot_to_log: string
    no_physical_auths: string
    affect_productivity: string
}