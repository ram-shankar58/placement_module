import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'globalFilter',
  standalone: false
})
export class GlobalFilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) return items;
    searchTerm = searchTerm.toLowerCase();

    return items.filter(item =>
      Object.values(item).some(val =>
        val?.toString().toLowerCase().includes(searchTerm)
      )
    );
  }
}
