import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './common/shared.module';
import { ComponentsModule } from './components/components.module';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CookieService } from 'ngx-cookie-service';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        ComponentsModule,
        GraphQLModule,
        HttpClientModule,
        SharedModule,
    ],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: (httpLink: HttpLink, cookieService: CookieService) => ({
                cache: new InMemoryCache({
                    addTypename: false,
                }),
                link: httpLink.create({
                    uri: 'https://api.github.com/graphql',
                    headers: new HttpHeaders()
                        .set('Authorization', `bearer ${cookieService.get('X-GITHUB-TOKEN')}`),
                }),
                defaultOptions: {
                    query: {
                        fetchPolicy: 'no-cache',
                        errorPolicy: 'all',
                    },
                },
            }),
            deps: [HttpLink, CookieService],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
