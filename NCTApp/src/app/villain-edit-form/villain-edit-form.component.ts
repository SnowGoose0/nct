import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VillainLocation } from '../location';
import { ReportService } from '../report.service';
import { VillainReport, VillainStatus } from '../villain';
import { ActivatedRoute, Router } from '@angular/router';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-villain-edit-form',
  templateUrl: './villain-edit-form.component.html',
  styleUrl: './villain-edit-form.component.css'
})
export class VillainEditFormComponent {
  form: FormGroup;
  errorMessage:string;

  constructor(private reportService:ReportService, private activatedRoute:ActivatedRoute, private router:Router) {
    const formControls = {
      password: new FormControl('', [Validators.required]),
    }

    this.form = new FormGroup(formControls);
    this.errorMessage = '';
  }

  ngOnInit(): void {
  }

  onSubmit(input:any) {
    console.log(input);

    const pw: string = input.password;

    if (Md5.hashStr(pw) === "fcab0453879a2b2281bc5073e3f5fe54") {
      const userAction:string = this.activatedRoute.snapshot.params['action'];
      const reportId:string = this.activatedRoute.snapshot.params['id'];

      const report: VillainReport | undefined = this.reportService.getReport(reportId);
      
      // error handling later
      if (!report) return;

      switch(userAction) {
        case 'delete':
          this.reportService.deleteReport(report);
          this.router.navigate(['/']);
          break;
        case 'update':
          this.reportService.updateReport(
            report,
            report.getStatus() === VillainStatus.Open ? VillainStatus.Resolved : VillainStatus.Open
          );
          this.router.navigate(['/info', report.getId()]);
          break;
      }
    }

    else {
      this.errorMessage='Invalid Password';
    }
  }

}
