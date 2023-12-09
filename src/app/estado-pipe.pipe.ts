import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoPipe'
})
export class EstadoPipePipe implements PipeTransform {

  transform(value: any, ...args: any[]) {
    
    if (value === true) {
      return 'En Stock';
    } else {
      return 'Sin Stock';
    }
  }

}
