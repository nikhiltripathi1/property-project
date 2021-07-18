import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({});
  loading = false;
  submitted = false;
  returnUrl: string = '';
  error = false;
  errorMsg: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      username: ['', Validators.compose([Validators.required])],
      phoneno: [
        '',
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
      repassword: ['', Validators.compose([Validators.required])],
    });
    // reset login status
    //this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .signup(
        this.f.email.value,
        this.f.password.value,
        this.f.username.value,
        this.f.phoneno.value,
        this.f.repassword.value
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['/properties']);
        },
        (error) => {
          this.error = true;
          this.errorMsg = error.error.msg;
          this.loading = false;
        }
      );
  }
}
