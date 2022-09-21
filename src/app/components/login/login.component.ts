import { LoginService } from './../../services/login.service';
import { User } from './../../interfaces/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isHidden = true;
  faTimes = faTimes;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    })
  }
  submit(){
    const loginData: any = {
      email: this.form.value.email,
      password: this.form.value.password,
    }
    this.loginService.login(loginData).subscribe((res)=>{
      console.log(res);
    }
    )
  }
  toggle() {
    this.isHidden = !this.isHidden;
  }

}
