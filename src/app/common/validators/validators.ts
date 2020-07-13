import { AbstractControl, ValidationErrors, FormControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export type ValidatorFunction = (value: any) => Observable<IValidationResult> | Promise<IValidationResult>;

export interface ISimpleValidationResult {
    [key: string]: any;
}

export interface IValidationResult {
    errors: ISimpleValidationResult | null;
}

export class CustomValidators {
    public static confirmPassword(passwordControl: AbstractControl): ValidatorFn {
        return (confirmPasswordControl): ISimpleValidationResult =>
            passwordControl.value === confirmPasswordControl.value ?
                undefined :
                { notMatching: true };
    }
}
