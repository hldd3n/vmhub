import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required,]],
            password: ['', [Validators.required]],
        });
    }

    public login() {
        this.authService.loginUser(this.loginForm.value).subscribe(
            (result) => document.location.href = result.redirectUrl
        )
    }
}
