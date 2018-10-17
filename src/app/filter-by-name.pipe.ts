import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(value: User[], name?: string): any {

    console.log(value, name);
    
    return value.filter(user => !name || user.firstName.toLowerCase().indexOf(name.toLowerCase()) != -1 || user.lastName.toLowerCase().indexOf(name.toLowerCase()) != -1);

  }

}
