import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted: boolean = false;
  message!: string;
  result: any;
  error: boolean = false;
  success: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.compose([Validators.required, , Validators.email])],
      password: ["", Validators.required],
    });
  }

  get formControls() { return this.loginForm.controls };

  ngOnInit(): void {
    if (this.authService.IsLoggedIn()) {
      this.router.navigate(['/manage-project'])
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      localStorage.removeItem(' first-form-group');
      localStorage.removeItem('token');
      localStorage.removeItem('user-data');
      let endPoint: string = "admin/login";
      this.authService.sendRequest('post', endPoint, this.loginForm.value).subscribe((result: any) => {
        this.result = result;
        if (this.result.success == false) {
          this.error = true;
          this.success = false;
          this.message = this.result.content.messageList.signin;
        } else if (this.result.success == true) {
          localStorage.setItem('user-data', JSON.stringify(this.result.content.dataList[0].userDetails));
          localStorage.setItem('token', this.result.content.dataList[0].token);
          this.loginForm.reset();
          this.isSubmitted = false;
          this.router.navigate(['/workspace']);
        }
      })
    }
  }

}
