import { Component, OnInit } from '@angular/core';
import { SortMethod, VillainReport, VillainStatus } from '../villain';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-villain-table',
  templateUrl: './villain-table.component.html',
  styleUrl: './villain-table.component.css'
})
export class VillainTableComponent implements OnInit {
  villainReports:VillainReport[];
  sortMethod: SortMethod;
  
  constructor(private rs: ReportService) {
    this.sortMethod = SortMethod.Villain;
    this.villainReports = [];    
  }

  setSortMethod(method: number) {
    switch(method) {
      case 0:
        this.sortMethod = SortMethod.Location;
        break;
      case 1:
        this.sortMethod = SortMethod.Villain;
        break;
      case 2:
        this.sortMethod = SortMethod.Time;
        break;
    }
  }

  ngOnInit(): void {
    this.villainReports = this.rs.getAllReports();
  }
}

