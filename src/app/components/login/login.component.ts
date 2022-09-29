import { ResetPasswordService } from './../../services/reset-password.service';
import { LoginInterceptor } from './../../interceptors/login.interceptor';
import { LoginService } from './../../services/login.service';
import { User } from './../../interfaces/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, enableProdMode } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  formReset: FormGroup;
  isHidden = true;
  faTimes = faTimes;

  constructor(private formBuilder: FormBuilder, 
              private http: HttpClient, 
              private router: Router,
              private loginService: LoginService, 
              private resetPasswordService: ResetPasswordService, 
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });

    this.formReset = this.formBuilder.group({
      email: ''
    });
  }

  submit(){
    const loginData: any = {
      email: this.form.value.email,
      password: this.form.value.password,
    }
    this.loginService.login(loginData).subscribe((res: any)=>{
      console.log(res);
      LoginInterceptor.accessToken = res.access_token;
      localStorage.setItem("access_token", res.access_token);
      this.router.navigate(["profile"]);
    }
    )
  }

  toggle() {
    this.isHidden = !this.isHidden;
  }

  submitReset(){
    const resetData: any = {
      email: this.formReset.value.email
    }
    this.resetPasswordService.requestReset(resetData).subscribe((res:any)=>{
      if(res.token){
        this.toastr.success(res.message, "Poslato");
      }
      else{
        this.toastr.warning(res.message);
      }
    })
  }

}
