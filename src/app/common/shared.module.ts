import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { MarkedPipe } from './pipes/marked.pipe';
import { RestructuredPipe } from './pipes/restructured.pipe';

@NgModule({
    declarations: [
        MarkedPipe,
        RestructuredPipe
    ],
    imports: [
        CommonModule,
        ClarityModule,
    ],
    exports: [
        CommonModule,
        ClarityModule,
        MarkedPipe,
        RestructuredPipe
    ]
})
export class SharedModule { }
