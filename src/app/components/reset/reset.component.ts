import { ToastrService } from 'ngx-toastr';
import { ResetPasswordService } from './../../services/reset-password.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private resetPasswordService: ResetPasswordService,
              private toastr: ToastrService,
              private router: Router) { }

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
    this.resetPasswordService.reset(data).subscribe({
      next: (res: any)=>{
        this.toastr.success(res, "Uspesno")
        this.router.navigate(["/login"]);
      },
      error: (err: any)=>{
        let greska = err.error.split("ERROR: ");
        delete greska[Object.keys(greska)[0]];;
        greska.forEach((e: any) => {
          this.toastr.error(e, "Greska");
        });
      }
    })
  }

}
