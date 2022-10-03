import { ResetPasswordService } from './../../services/reset-password.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class ResetComponent implements OnInit {
  form: FormGroup
  token = '';
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private resetPasswordService: ResetPasswordService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any)=>{
      this.token = params.token;
    });
    this.form = this.formBuilder.group({
      password: ''
    });
  }

  submit(){
    const data: any = {
      password: this.form.value.password,
      token: this.token
    }
    this.resetPasswordService.reset(data).subscribe((res)=>{
      console.log(res);
    })
  }

}
