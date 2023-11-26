import { Component, Input } from '@angular/core';
import { VillainReport } from '../villain';
import { Router } from '@angular/router';

@Component({
  selector: 'tr [app-villain]',
  templateUrl: './villain.component.html',
  styleUrl: './villain.component.css'
})
export class VillainComponent {
  @Input() villain!: VillainReport;

  constructor(private router:Router) {};

  onMoreInfo() {
    this.router.navigate(['/info', this.villain.getId()])
  }
}
