import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { ActivatedRoute } from '@angular/router';
import { VillainReport } from '../villain';

@Component({
  selector: 'app-villain-info',
  templateUrl: './villain-info.component.html',
  styleUrl: './villain-info.component.css'
})
export class VillainInfoComponent implements OnInit{
  reportId:string;
  report:VillainReport | undefined;

  constructor(
    private reportService:ReportService, 
    private activatedRoute:ActivatedRoute) {
      this.reportId = activatedRoute.snapshot.params['id']
      this.report = reportService.getReport(this.reportId);
      console.log(reportService.getAllReports());
      console.log(this.report);
  }

  onUpdateStatus() {

  }
  
  ngOnInit(): void {
    
  }
}
