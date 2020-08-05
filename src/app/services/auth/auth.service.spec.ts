import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RequesterService } from '../requester.service';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from 'src/app/models/user.model';

describe('AuthService', () => {
    let service: AuthService;
    let mockRequester: RequesterService;
    let mockCookieService: CookieService;
    
    beforeEach(() => {
        mockRequester = jasmine.createSpyObj(['post'])
        mockCookieService = jasmine.createSpyObj({
            'get': (string: string) => 'mockToken',
            'deleteAll': (string: string) => undefined,
        })
        service = new AuthService(mockRequester, mockCookieService)
    });

    describe('registerUser method', () => {
        it('should call requester post method with the passed user', () => {
            // Arrange
            const testUser: UserModel = { username: 'Rick', password: 'Morty'}

            // Act
            service.registerUser(testUser);

            //Assert
            expect(mockRequester.post).toHaveBeenCalledWith(jasmine.any(String), testUser)
        })
    })

    describe('loginUser method', () => {
        it('should call requester post method with the passed user', () => {
            // Arrange
            const testUser: UserModel = { username: 'Rick', password: 'Morty'}

            // Act
            service.loginUser(testUser);

            //Assert
            expect(mockRequester.post).toHaveBeenCalledWith(jasmine.any(String), testUser, jasmine.any(Object))
        })
    })

    describe('logout method', () => {
        it('should call cookieService deleteAll method', () => {
            // Act
            const result = service.logout();

            //Assert
            expect(mockCookieService.deleteAll).toHaveBeenCalledWith('/')
            expect(result).toBeUndefined()
        })
    })

    describe('getUsername method', () => {
        it('should call cookieService get method with token key', () => {
            // Act
            const result = service.getUsername();

            //Assert
            expect(mockCookieService.get).toHaveBeenCalledWith('X-VMNEST-TOKEN')
            expect(result).toBeUndefined()
        })
    })
});
