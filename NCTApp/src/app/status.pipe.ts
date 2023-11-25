import { Pipe, PipeTransform } from '@angular/core';
import { VillainStatus } from './villain';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(status: number): string {
    let statusMessage = '';

    switch(status) {
      case VillainStatus.Open:
        statusMessage = '🆘';
        break;

      case VillainStatus.Resolved:
        statusMessage = '✅';
    }

    return statusMessage;
  }

}
