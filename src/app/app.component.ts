import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Libee';
  startLoader: boolean;
  constructor() {
    this.startLoader = true;
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.startLoader = false;
    }, 1000);
  }
}
