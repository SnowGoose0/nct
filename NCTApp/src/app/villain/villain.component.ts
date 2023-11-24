import { Component, Input } from '@angular/core';
import { VillainReport } from '../villain';

@Component({
  selector: 'app-villain',
  templateUrl: './villain.component.html',
  styleUrl: './villain.component.css'
})
export class VillainComponent {
  @Input() villain!: VillainReport;

  constructor() {};
}
