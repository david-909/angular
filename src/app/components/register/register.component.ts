import { ToastrService } from 'ngx-toastr';
import { RegisterService } from './../../services/register.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { API } from './../../const';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router,
              private registerService: RegisterService,
              private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
      name: '',
      surname: ''
    })
  }

  submit(){
    const registerData: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      name: this.form.value.name,
      surname: this.form.value.surname,
    }
    this.registerService.register(registerData).subscribe({
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
    }
    
    )
  }

}
