import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
  standalone: true
})
export class KeysPipe implements PipeTransform {
  transform(value: { [key: string]: string }): Array<{ key: string, value: string }> {
    if (!value) {
      return [];
    }
    return Object.keys(value).map(key => ({ key, value: value[key] }));
  }

}
