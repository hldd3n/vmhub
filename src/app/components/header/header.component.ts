import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public username: string;
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
    ) { }

    ngOnInit(): void {
        this.username = this.authService.getUsername();
    }

    public logout(): void {
        this.authService.logout();
        this.router.navigate(['']);
    }
}
