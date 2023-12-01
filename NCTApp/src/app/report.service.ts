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
    // let fdf:VillainReport = new VillainReport('metrotown', metro, 'johnny', new Date(), VillainStatus.Open, 'idk', null, 'cooking')
    // let sss:VillainReport = new VillainReport('burnaby', burnaby, 'johnny', new Date(), VillainStatus.Open, 'idk', null, 'cooking')
    // let lll:VillainLocation = new VillainLocation('burnaby', burnaby.x, burnaby.y);
    // let kkk:VillainLocation = new VillainLocation('metrotown', metro.x, metro.y);
    // this.reports = [fdf, sss];
    // this.locations = [lll, kkk];

    this.http.get(Storage.getDocumentKeyURL('test/', 'reports/'))
      .subscribe((res: Object) => {
        const response:{key:string, data:any[]} = res as {key:string, data:any[]};
        response.data.forEach((r) => {

          const newReport: VillainReport = new VillainReport(
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

          this.reports.push(newReport);
        })
  
      });
  }

  addReport(report: VillainReport) {
    this.reports.push(report);
    this.syncData();
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
    this.syncData();
  }

  updateReport(report: VillainReport, status: VillainStatus) {
    const idx: number = this.reports.findIndex((r:VillainReport) => r.getId() == report.getId());
    this.reports[idx].updateStatus(status);
    this.syncData();
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
    this.syncData();
  }

  // getLocations() {
  //   this.http.get(Storage.getDocumentKeyURL('test/', 'locations/'))
  //     .subscribe((res: Object) => {
  //       const response:{key:string, data:any[]} = res as {key:string, data:any[]};
  //       response.data.forEach((l) => {
  //         const newLocation: VillainLocation = new VillainLocation(
  //           l.location,
  //           l.x,
  //           l.y,
  //           l.count,
  //         )
  //         this.locations.push(newLocation);
  //       })
  //     });

  //   return of(this.locations);
  // }

  getLocations(): Observable<VillainLocation[]> {
    return this.http
      .get(Storage.getDocumentKeyURL('test/', 'locations/'))
      .pipe(
        map((res: any) => {
          return res.data.map((l: { location: string; x: number; y: number; count: number | undefined; }) => {
            this.locations.push(new VillainLocation(l.location, l.x, l.y, l.count));
            return new VillainLocation(l.location, l.x, l.y, l.count);
          });
        })
      );
  }

  syncData() {
    this.http.put(
      Storage.getDocumentKeyURL('test/', 'reports/'), 
      {"key": "reports", "data": this.reports}
    ).subscribe((data) => {
      console.log(data);
    });

    this.http.put(
      Storage.getDocumentKeyURL('test/', 'locations/'), 
      {"key": "locations", "data": this.locations}
    ).subscribe((data) => {
      console.log(data);
    });
  }
}
