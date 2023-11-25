import { Injectable } from '@angular/core';
import { VillainStatus } from './villain';
import { VillainReport } from './villain';

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  private reports:VillainReport[];
  
  constructor() { 
    this.reports = [];
    let fdf:VillainReport = new VillainReport('vancouver', 'johnny', new Date(), VillainStatus.Open, 'idk', 'cooking')
    let sss:VillainReport = new VillainReport('burnaby', 'johnny', new Date(), VillainStatus.Open, 'idk', 'cooking')
    this.reports = [fdf, sss];
  }

  addReport(report: VillainReport) {
    this.reports.push(report);
  }

  updateReport(report: VillainReport, status: VillainStatus) {
    const idx: number = this.reports.findIndex((r:VillainReport) => r.getId() == report.getId());
    this.reports[idx].updateStatus(status);
  }

  getAllReports() {
    return this.reports;
  }

  deleteReport(report: VillainReport) {
    this.reports = this.reports.filter((r: VillainReport) => {
      r.getId() != r.getId();
    });
  }
}
