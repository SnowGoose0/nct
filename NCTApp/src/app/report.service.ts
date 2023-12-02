import { Injectable } from '@angular/core';
import { VillainStatus } from './villain';
import { VillainReport } from './villain';
import { VillainLocation } from './location';
import { Storage } from './storage';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  private reports:VillainReport[];
  private locations:VillainLocation[];
  
  constructor(private http:HttpClient) { 
    this.reports = [];
    this.locations = [];
    let burnaby = {x: 49.2781, y: -122.9199};
    let metro = {x: 49.2276, y:-123.0076};
  }

  addReport(report: VillainReport) {
    this.reports.push(report);
    return this.syncReports();
  }

  deleteReport(report: VillainReport) {
    this.reports = this.reports.filter((r: VillainReport) => {
      return r.getId() != report.getId();
    });

    return this.syncReports();
  }

  updateReport(report: VillainReport, status: VillainStatus) {
    const idx: number = this.reports.findIndex((r:VillainReport) => r.getId() == report.getId());
    this.reports[idx].updateStatus(status);
    return this.syncReports();
  }

  getAllReports() {
    return this.http
    .get(Storage.getDocumentKeyURL('test/', 'reports/'))
    .pipe(
      map((res: any) => {
        this.reports = res.data.map((r: any) => {
          const report: VillainReport = new VillainReport(
            r.name,
            r.reporter,
            new Date(r.time), 
            r.location, 
            r.coordinates, 
            r.status, 
            r.description,
            r.imageurl, 
            r.id,
          )
          return report;
        });
        
        return this.reports;
      })
    );
  }

  addLocation(location:VillainLocation) {
    const locationName:string = location.getLocation();
    const locationCoordinates:{x:number, y:number} = location.getCoordinates();
    const searchLocationIndex:number | undefined = this.locations.findIndex((l) => {
      return l.getLocation().toLowerCase() === locationName.toLowerCase();
    });

    const searchLocation:VillainLocation = this.locations[searchLocationIndex];

    if (!searchLocation) {
      const newLocation = new VillainLocation(locationName, locationCoordinates.x, locationCoordinates.y);
      this.locations.push(newLocation);
    }

    else {
      this.locations[searchLocationIndex].incrementCount();
    }

    console.log(this.locations);

    return this.syncLocations();
  }

  deleteLocation(location: string) {
    const locationIndex:number = this.locations.findIndex((l) => {
      return l.getLocation().toLowerCase() === location.toLowerCase();
    });

    if (this.locations[locationIndex].getCount() === 1) {
      this.locations.splice(locationIndex, 1);
    } else {
      this.locations[locationIndex].decrementCount();
    }

    return this.syncLocations();
  }

  getLocations(): Observable<VillainLocation[]> {
    return this.http
      .get(Storage.getDocumentKeyURL('test/', 'locations/'))
      .pipe(
        map((res: any) => {
          this.locations = res.data.map((l: { location: string; x: number; y: number; count: number | undefined; }) => {
            const location = new VillainLocation(l.location, l.x, l.y, l.count);
            return location;
          });

          return this.locations;
        })
      );
  }

  syncReports() {
    return this.http.put(
      Storage.getDocumentKeyURL('test/', 'reports/'), 
      {"key": "reports", "data": this.reports}
    )
  }

  syncLocations() {
    return this.http.put(
      Storage.getDocumentKeyURL('test/', 'locations/'), 
      {"key": "locations", "data": this.locations}
    )
  }
}
