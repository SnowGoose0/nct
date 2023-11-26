import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReportService } from '../report.service';
import { VillainReport, VillainStatus } from '../villain';
import { VillainLocation } from '../location';

@Component({
  selector: 'app-villain-form',
  templateUrl: './villain-form.component.html',
  styleUrl: './villain-form.component.css'
})
export class VillainFormComponent implements OnInit{
  form: FormGroup;
  locations: VillainLocation[]
  constructor(private reportService:ReportService, private router:Router) {
    const formControls = {
      reporter: new FormControl('', [Validators.required, Validators.minLength(2)]),
      mischief_maker: new FormControl('', [Validators.required, Validators.minLength(2)]),
      picture: new FormControl('', [Validators.pattern("https://.*")]),
      location: new FormControl('', [Validators.required]),
      coordX: new FormControl('', [Validators.required]),
      coordY: new FormControl('', [Validators.required]),
      comments: new FormControl('', [Validators.required, Validators.minLength(1)]),
    }

    this.form = new FormGroup(formControls);
    this.locations = [];
  }

  ngOnInit(): void {
    this.locations = this.reportService.getLocations();
    console.log(this.locations)
  }

  onSubmit(input:any) {
    console.log(input);
    const report:VillainReport = new VillainReport(input.location, input.mischief_maker, new Date(), VillainStatus.Open, input.mischief_maker, input.comments)
    this.reportService.addReport(report);
    this.router.navigate(["/"])
  }
}
