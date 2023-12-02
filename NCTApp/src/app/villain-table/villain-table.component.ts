import { Component, OnInit } from '@angular/core';
import { SortMethod, VillainReport, VillainStatus } from '../villain';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-villain-table',
  templateUrl: './villain-table.component.html',
  styleUrl: './villain-table.component.css',
  host: {'class': 'villain-table'}
})
export class VillainTableComponent implements OnInit {
  villainReports:VillainReport[];
  sortMethod: SortMethod;
  sortSymbolDisplay: number;
  
  constructor(private rs: ReportService) {
    this.sortMethod = SortMethod.Villain;
    this.villainReports = [];   
    this.sortSymbolDisplay = -1; 
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

  onSortSymbolDisplay(index: number) {
    this.sortSymbolDisplay = index;
  }

  onUpdateTable() {
    this.rs.getAllReports().subscribe((stream) => {
      this.villainReports = stream;
    });
  }

  ngOnInit(): void {
    this.onUpdateTable();
  }
}

