import { Injectable } from '@angular/core';
import { VillainStatus } from './villain';
import { VillainReport } from './villain';
import { VillainLocation } from './location';

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  private reports:VillainReport[];
  private locations:VillainLocation[];
  
  constructor() { 
    this.reports = [];
    this.locations = [];
    let fdf:VillainReport = new VillainReport('vancouver', 'johnny', new Date(), VillainStatus.Open, 'idk', 'cooking')
    let sss:VillainReport = new VillainReport('burnaby', 'johnny', new Date(), VillainStatus.Open, 'idk', 'cooking')
    let lll:VillainLocation = new VillainLocation('burnaby', 404.404, 505.505);
    this.reports = [fdf, sss];
    this.locations = [lll];
  }

  addReport(report: VillainReport) {
    this.reports.push(report);
  }

  updateReport(report: VillainReport, status: VillainStatus) {
    const idx: number = this.reports.findIndex((r:VillainReport) => r.getId() == report.getId());
    this.reports[idx].updateStatus(status);
  }

  getReport(id: string) {
    const idx: number = this.reports.findIndex((r:VillainReport) => r.getId() == id);

    if (idx === -1) return undefined;

    return this.reports[idx];
  }

  getAllReports() {
    return this.reports;
  }

  deleteReport(report: VillainReport) {
    this.reports = this.reports.filter((r: VillainReport) => {
      r.getId() != report.getId();
    });
  }

  getLocations() {
    return this.locations;
  }
}
