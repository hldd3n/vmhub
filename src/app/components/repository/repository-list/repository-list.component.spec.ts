import { RepositoryListComponent } from "./repository-list.component"
import { IRepository } from 'src/app/common/interfaces/repository.interface';
import { Router } from '@angular/router';
import { RepositoryService } from 'src/app/services/repository/repository.service';
import { of } from 'rxjs';

const repositoriesFixture = [
    {
        name: 'firstRepo',
        readmeMd: 'justkeepswimming',
        readmeRst: undefined,
        license: {
            name: 'MIT',
        },
        contributors: [
            { name: 'hldd3n', commits: 1 },
        ],
        commits: [{
            message: 'quickfix everything',
            date: '2015-03-25',
            contributor: 'hldd3n',
            sha: 'link'
        }],
        commitsCount: 15,
        releases: ['1.beta'],
        branches: ['master'],
    },
]

describe('RepositoryListComponent', () => {
    let component: RepositoryListComponent
    let repositories: IRepository[];
    let loading: boolean;

    let mockRouter;
    let mockRepositoryService;

    beforeEach(() => {
        mockRouter = jasmine.createSpyObj(['navigate'])
        mockRepositoryService = jasmine.createSpyObj(['getRepositories'])
        
        component = new RepositoryListComponent(mockRouter, mockRepositoryService);
    })
    
    describe('ngOnInit', () => {
        it('should load the repositories subscribing to repositoryService getRepositories method', () => {
            // Arrange
            mockRepositoryService.getRepositories.and.returnValue(of(repositoriesFixture))
            // Act
            component.ngOnInit()
            // Assert
            expect(component.repositories.length).toBe(1);
        })

        it('should set loading field to false', () => {
            // Arrange
            mockRepositoryService.getRepositories.and.returnValue(of(repositoriesFixture))
            // Act
            component.ngOnInit()
            // Assert
            expect(component.loading).toBe(false);
        })
    })

    describe('handleRowClick', () => {
        it('should call router navigate method with repository name', () => {
            // Arrange
            const testRepository = repositoriesFixture[0];
            // Act
            component.handleRowClick(testRepository)
            // Assert
            expect(mockRouter.navigate).toHaveBeenCalledWith([jasmine.any(String), jasmine.any(String), `${testRepository.name}`])
        })
    })
})
