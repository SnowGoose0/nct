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
export class VillainFormComponent implements OnInit {
  form: FormGroup;
  locations: VillainLocation[]
  inputLocation:string | undefined;
  coordX: number | undefined;
  coordY: number | undefined;

  constructor(private reportService:ReportService, private router:Router) {
    const formControls = {
      reporter: new FormControl('', [Validators.required, Validators.minLength(2)]),
      mischief_maker: new FormControl('', [Validators.required, Validators.minLength(2)]),
      picture: new FormControl('', [Validators.pattern("https://*")]),
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
    const report:VillainReport = new VillainReport(input.location, {x: input.coordX, y: input.coordY}, input.mischief_maker, new Date(), VillainStatus.Open, input.mischief_maker, input.picture, input.comments)
    this.reportService.addReport(report);
    this.router.navigate(["/"])
  }

  onInputLocation() {
    const filteredLocations:VillainLocation[] = this.locations.filter((l) => {
      return l.getLocation() === this.inputLocation;
    });

    if (filteredLocations.length === 0) {
      this.coordX = undefined;
      this.coordY = undefined;
      return;
    }

    const definedCoords:{x:number, y:number} = filteredLocations[0].getCoordinates();
    this.coordX = definedCoords.x;
    this.coordY = definedCoords.y;
    this.form.get('coordX')?.setValue(definedCoords.x);
    this.form.get('coordY')?.setValue(definedCoords.y);
  }
}
