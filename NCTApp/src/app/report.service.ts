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
