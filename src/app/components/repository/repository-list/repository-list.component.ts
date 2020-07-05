import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-repository-list',
    templateUrl: './repository-list.component.html',
    styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnInit {

    public repositories: any[] = []

    constructor() { }

    ngOnInit(): void {
        this.repositories = [{
            name: 'FirstRepo',
            license: 'none',
            commits: 15,
            contributors: ['ivan', 'dragan'],
            releases: 'dobre',
            branches: ['master', 'develop'],
        }]
    }

}
