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

    let fdf:VillainReport = new VillainReport('vancouver', 'johnny', new Date(), VillainStatus.Open, 'idk', 'cooking')
    let sss:VillainReport = new VillainReport('vancouver', 'johnny', new Date(), VillainStatus.Open, 'idk', 'cooking')
    this.villainReports = [fdf, sss];
    
  }

  ngOnInit(): void {
    this.villainReports = this.rs.getAllReports();
  }
}

