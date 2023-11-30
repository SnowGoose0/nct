import { Component, Input } from '@angular/core';
import { VillainReport } from '../villain';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { ReportService } from '../report.service';

@Component({
  selector: 'tr [app-villain]',
  templateUrl: './villain.component.html',
  styleUrl: './villain.component.css'
})
export class VillainComponent {
  @Input() villain!: VillainReport;
  constructor(private reportService: ReportService, private router:Router) {};

  onMoreInfo() {
    this.router.navigate(['/info', this.villain.getId()]);
  }

  toggleDeleteReport(e: any) {
    this.router.navigate(['/auth', 'delete', this.villain.getId()]);
  }
}