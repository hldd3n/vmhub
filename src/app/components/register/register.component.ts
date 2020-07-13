import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { CustomValidators } from '../../common/validators/validators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', [
                Validators.required,
                Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,16}$/)
            ]],
            confirmPassword: ['']
        });

        this.registerForm.controls.confirmPassword.setValidators([CustomValidators.confirmPassword(this.registerForm.controls.password)]);
    }

    public register() {
        this.authService.registerUser(this.registerForm.value).subscribe(
            () => this.router.navigate[''],
            (error) => console.log(error)
        )
    }
}
