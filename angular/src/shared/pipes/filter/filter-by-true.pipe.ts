import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTrue'
})
export class FilterByTruePipe implements PipeTransform {

  transform(values: any[], args?: any): any[] {
    return values.filter(k=>k.value);
  }

}
