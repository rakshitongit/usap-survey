import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Survey', url: '/survey', icon: 'paper-plane' },
    { title: 'History', url: '/history', icon: 'folder' },
    {title: 'My Profile', url: '/myProfile', icon: 'person'}
  ];

  constructor() {}
}
