import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';

@Pipe({
    name: 'marked'
})
export class MarkedPipe implements PipeTransform {
    public transform(markdown: string): string {
        if (markdown == null) return '';
        return marked(markdown);
    }
}
