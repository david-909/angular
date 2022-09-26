import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginInterceptor } from './../../interceptors/login.interceptor';
import { ProfileService } from './../../services/profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../register/register.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  name = '';
  surname = '';
  constructor(private profileService: ProfileService, private formBuilder: FormBuilder, private router: Router) { }

  
  ngOnInit(): void {
    if(localStorage.getItem("access_token") != null){
      LoginInterceptor.accessToken = localStorage.getItem("access_token");
    }
    this.profileService.getUser().subscribe((res: any)=>{
      console.log(res);
      this.name = res.body.name;
      this.surname = res.body.surname;
    })
    

    this.form = this.formBuilder.group({
      name: this.name,
      surname: this.surname
    })
  }

  submit(){
    const data: any = {
      name: this.form.value.name,
      surname: this.form.value.surname
    }
    this.profileService.update(data).subscribe((res)=> {
      console.log(res);
    })
  }

  logout(){
    if(localStorage.getItem("access_token") != null){
      localStorage.removeItem("access_token");
      this.router.navigate(["/login"]);
      //console.log("click", localStorage.getItem("access_token"));
    }
  }

}
