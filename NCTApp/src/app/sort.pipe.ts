import { Pipe, PipeTransform } from '@angular/core';
import { SortMethod, VillainReport } from './villain';

const stringCompare = (a:string, b:string):number => {
  a = a.toLowerCase();
  b = b.toLowerCase();
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

const dateCompare = (a:Date, b:Date) => {
  const timeA = a.getTime();
  const timeB = b.getTime();

  if (timeA > timeB) {
    return -1;
  } else if (timeA < timeB) {
    return 1;
  } else {
    return 0;
  }
}

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(list: VillainReport[], method: SortMethod): VillainReport[] {

    return list.sort((a, b) => {
      switch (method) {
        case SortMethod.Reporter:
          return stringCompare(a.reporter, b.reporter);
        case SortMethod.Villain:
          return stringCompare(a.name, b.name);
        case SortMethod.Time:
          return dateCompare(a.time, b.time);
        case SortMethod.Location:
          return stringCompare(a.location, b.location);
        default:
          return 0;
      }
    })
  }

}
