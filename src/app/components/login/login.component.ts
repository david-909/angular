import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isShown = true;
  faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {
  }
  toggle() {
    this.isShown = !this.isShown;
  }

}
