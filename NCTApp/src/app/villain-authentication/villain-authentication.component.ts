import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VillainLocation } from '../location';
import { ReportService } from '../report.service';
import { VillainReport, VillainStatus } from '../villain';
import { ActivatedRoute, Router } from '@angular/router';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-villain-authentication',
  templateUrl: './villain-authentication.component.html',
  styleUrl: './villain-authentication.component.css'
})
export class VillainAuthenticationComponent {
  form: FormGroup;
  errorMessage:string;
  userAction:string;
  report: VillainReport | undefined;

  throwError: boolean;

  constructor(private reportService:ReportService, private activatedRoute:ActivatedRoute, private router:Router) {
    const formControls = {
      password: new FormControl('', [Validators.required]),
    }

    this.form = new FormGroup(formControls);
    this.report = new VillainReport('', '', '', new Date(), '', {x:NaN,y:NaN}, VillainStatus.Open, '');
    this.errorMessage = '';
    this.userAction = '';
    this.throwError = false;
  }

  ngOnInit(): void {
    const reportId:string = this.activatedRoute.snapshot.params['id'];
    // this.report = this.reportService.getReport(reportId);

    this.reportService.getAllReports().subscribe((stream) => {
      this.report = stream.find((r) => {
        return r.getId() === reportId;
      })

      if (this.report === undefined) {
        this.throwError = true;
      }
    });

    this.reportService.getLocations().subscribe(() => {});

    this.userAction = this.activatedRoute.snapshot.params['action'];

    if (this.userAction !== 'delete' && this.userAction !== 'update') {
      this.throwError = true;
    }
  }

  onSubmit(input:any) {
    console.log(input);

    const pw: string = input.password;

    if (Md5.hashStr(pw) === "fcab0453879a2b2281bc5073e3f5fe54") {

      const currentReport = this.report;
      
      // error handling later
      if (!currentReport) return;

      switch(this.userAction) {
        case 'delete':
          this.reportService.deleteReport(currentReport).subscribe(() => {
            this.reportService.deleteLocation(currentReport.location).subscribe(() => {
              this.router.navigate(['/']);
            });
          });
          break;
        case 'update':
          this.reportService.updateReport(
            currentReport,
            currentReport.getStatus() === VillainStatus.Open ? VillainStatus.Resolved : VillainStatus.Open
          ).subscribe(() => {
            this.router.navigate(['/info', currentReport.getId()]);
          })
          break;

        default:
          
      }
    }

    else {
      this.errorMessage='Invalid Password';
    }
  }

}
