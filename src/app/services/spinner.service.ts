import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    isVisible$: BehaviorSubject<boolean>;

    constructor() {
        this.isVisible$ = new BehaviorSubject(false);
    }

    showSpinner() {
        this.isVisible$.next(true);
    }

    hideSpinner() {
        this.isVisible$.next(false);
    }
}