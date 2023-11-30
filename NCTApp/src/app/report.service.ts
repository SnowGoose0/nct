import { Injectable } from '@angular/core';
import { VillainStatus } from './villain';
import { VillainReport } from './villain';
import { VillainLocation } from './location';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  private reports:VillainReport[];
  private locations:VillainLocation[];
  
  constructor() { 
    this.reports = [];
    this.locations = [];
    let burnaby = {x: 49.2781, y: -122.9199};
    let metro = {x: 49.2276, y:-123.0076};
    let fdf:VillainReport = new VillainReport('metrotown', metro, 'johnny', new Date(), VillainStatus.Open, 'idk', null, 'cooking')
    let sss:VillainReport = new VillainReport('burnaby', burnaby, 'johnny', new Date(), VillainStatus.Open, 'idk', null, 'cooking')
    let lll:VillainLocation = new VillainLocation('burnaby', burnaby.x, burnaby.y);
    let kkk:VillainLocation = new VillainLocation('metrotown', metro.x, metro.y);
    this.reports = [fdf, sss];
    this.locations = [lll, kkk];
  }

  addReport(report: VillainReport) {
    this.reports.push(report);
  }

  deleteReport(report: VillainReport) {
    this.reports = this.reports.filter((r: VillainReport) => {
      return r.getId() != report.getId();
    });

    const locationIndex:number = this.locations.findIndex((l) => {
      return l.getLocation().toLowerCase() === report.location.toLowerCase();
    });

    if (this.locations[locationIndex].getCount() === 1) {
      this.locations.splice(locationIndex, 1);
    } else {
      this.locations[locationIndex].decrementCount();
    }
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

  addLocation(location:VillainLocation) {
    const locationName:string = location.getLocation();
    const locationCoordinates:{x:number, y:number} = location.getCoordinates();
    const searchLocation:VillainLocation | undefined = this.locations.find((l) => {
      return l.getLocation().toLowerCase() === locationName.toLowerCase();
    });

    if (!searchLocation) {
      const newLocation = new VillainLocation(locationName, locationCoordinates.x, locationCoordinates.y);
      this.locations.push(newLocation);
      return;
    }

    searchLocation.incrementCount();
  }

  getLocations() {
    return this.locations;
  }
}
