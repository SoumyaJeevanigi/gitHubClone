
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'orderBy'
}) 
export class OrderByPipe implements PipeTransform {
  transform(value: any, args: string): any {
      console.log("In Pipe");
      let a = args.split("_");
      if (a[0] === 'name' && a[1] == 'true') {
          return value.sort((a: any, b: any) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return -1;
              } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
                  return 1;
              } else {
                  return 0;
              }
          });
      }else if (a[0] === 'name' && a[1] == 'false') {
          return value.sort((a: any, b: any) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                  return -1;
              } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return 1;
              } else {
                  return 0;
              }
          });
      }
      return value;
  }
}