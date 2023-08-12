import { Component, Input } from '@angular/core';

@Component({
  selector: 'bh-text-icon',
  templateUrl: './text-icon.component.html',
  styleUrls: ['./text-icon.component.scss'],
})
export class TextIconComponent {
  @Input() text?: string | number = '';
  @Input() icon?: string = '';
}
