import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RSM-CLIENT';

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    event.preventDefault();
   
}
}
