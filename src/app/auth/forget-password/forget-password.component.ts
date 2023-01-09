import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPasswordForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required,,Validators.email])],
    });
  }

  get formControls() { return this.forgetPasswordForm.controls};

  ngOnInit(): void {
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.forgetPasswordForm.invalid) {
      return;
    } else {
      this.isSubmitted =false;
      this.forgetPasswordForm.reset();
    }
  }

  onBack() {
    window.history.back();
  }

}
