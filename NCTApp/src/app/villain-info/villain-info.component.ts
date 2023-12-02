import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VillainReport, VillainStatus } from '../villain';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-villain-info',
  templateUrl: './villain-info.component.html',
  styleUrl: './villain-info.component.css'
})
export class VillainInfoComponent implements OnInit {
  reportId:string;
  report:VillainReport | undefined;

  constructor(
    private reportService:ReportService, 
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {
      this.reportId = activatedRoute.snapshot.params['id']
      this.report = new VillainReport('', '', new Date(), '', {x:NaN,y:NaN}, VillainStatus.Open, '');
  }

  onUpdateStatus() {
    if (!this.report) return;
    this.router.navigate(['/auth', 'update', this.report.getId()]);
  }
  
  ngOnInit(): void {
    this.reportId = this.activatedRoute.snapshot.params['id']
    this.reportService.getAllReports().subscribe((stream) => {
      this.report = stream.find((r) => {
        return r.getId() === this.reportId;
      })
    });
    
  }
}
