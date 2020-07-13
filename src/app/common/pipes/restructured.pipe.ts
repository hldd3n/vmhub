import { Pipe, PipeTransform } from '@angular/core';
import * as rst2html from 'rst2html';

@Pipe({
    name: 'restructured'
})
export class RestructuredPipe implements PipeTransform {
    public transform(restructured: string): string {
        if (restructured == null) return '';
        return rst2html(restructured)
    }
}
