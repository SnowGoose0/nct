import { Component, OnInit } from '@angular/core';
import { VillainReport, VillainStatus } from '../villain';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-villain-table',
  templateUrl: './villain-table.component.html',
  styleUrl: './villain-table.component.css'
})
export class VillainTableComponent implements OnInit {
  villainReports:VillainReport[];
  
  constructor(private rs: ReportService) {
    this.villainReports = [];    
  }

  ngOnInit(): void {
    this.villainReports = this.rs.getAllReports();
  }
}

