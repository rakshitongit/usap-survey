import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Survey', url: '/survey/main', icon: 'paper-plane' },
    { title: 'History', url: '/history', icon: 'folder' },
    { title: 'My Profile', url: '/myProfile', icon: 'person' },
    { title: 'Logout', url: '/logout', icon: 'log-out' }
  ];

  constructor() { }
}
