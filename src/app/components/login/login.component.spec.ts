import { RouterTestingModule } from "@angular/router/testing";
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { rootRoutes } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>
    let mockAuthService;


    beforeEach(() => {
        mockAuthService = jasmine.createSpyObj(['loginUser'])

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(rootRoutes),
                ReactiveFormsModule,
                FormsModule,
            ],
            declarations: [LoginComponent],
            providers: [
                { provide: AuthService, useValue: mockAuthService }
            ]
        })

        fixture = TestBed.createComponent(LoginComponent);

        component = fixture.componentInstance;
        component.ngOnInit()
    })

    it('Form should be invalid when it is empty', () => {
        expect(component.loginForm.valid).toBeFalsy();
    })

    it('Form username control should be required', () => {
        let username = component.loginForm.controls['username'];
        let errors = username.errors

        expect(errors['required']).toBeTruthy()
    })

    it('clicking login button should call authService loginUser method', () => {
        // Arrange
        component.loginForm.controls['username'].setValue('newUser');
        component.loginForm.controls['password'].setValue('verysecret');
        const loginButton = fixture.debugElement.query(By.css('.btn-primary'))
        // Act
        loginButton.triggerEventHandler('click', null);
        // Assert
        expect(mockAuthService.loginUser).toHaveBeenCalledWith({ username: 'newUser', password: 'verysecret'})
    })
})