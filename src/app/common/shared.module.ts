import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HttpClientXsrfModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClarityModule,
    // HttpClientXsrfModule.withOptions({
    //     cookieName: 'X-VMNEST-TOKEN',
    //     headerName: 'X-GITHUB-TOKEN',
    // }),
  ],
  exports: [
    CommonModule,
    ClarityModule,
  ]
})
export class SharedModule { }
