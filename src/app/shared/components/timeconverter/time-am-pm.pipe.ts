import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeAmPm',
    standalone: false
 })

export class TimeAmPmPipe implements PipeTransform {
    standalone = false;
  transform(value: string): string {
    if (!value) return '';
    const [hourStr, minuteStr] = value.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr || '00';
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  }
}