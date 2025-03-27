import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'initials', standalone: true })
export class TextInitialsPipe implements PipeTransform {
  transform(value?: string): string {
    if (!value) return '';

    const initials = value
      .replace(/\s+/g, '')
      .slice(0, 2)
      .toUpperCase();
    return initials;
  }
}
