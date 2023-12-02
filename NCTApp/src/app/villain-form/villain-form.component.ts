import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  errorMessage: string;
  locations: VillainLocation[]
  inputLocation:string | undefined;

  coordX: number | undefined;
  coordY: number | undefined;

  selectedCoordX: number | undefined;
  selectedCoordY: number | undefined;

  constructor(private reportService:ReportService, private router:Router) {
    const formControls = {
      reporter: new FormControl('', [Validators.required, Validators.minLength(2)]),
      telephone: new FormControl('', [Validators.required, this.phonePatternValidator]),
      mischief_maker: new FormControl('', [Validators.required, Validators.minLength(2)]),
      picture: new FormControl('', []),
      location: new FormControl('', [Validators.required]),
      coordX: new FormControl('', [Validators.required]),
      coordY: new FormControl('', [Validators.required]),
      comments: new FormControl('', [Validators.required, Validators.minLength(1)]),
    }

    this.form = new FormGroup(formControls);
    this.errorMessage = '';
    this.locations = [];
  }

  phonePatternValidator: ValidatorFn = (control: AbstractControl) => {
    const phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/;
  
    if (!control.value || phoneNumberPattern.test(control.value)) {
      return null;
    } else {
      return { 'invalidPhone': true };
    }
  };

  ngOnInit(): void {
    this.reportService.getAllReports().subscribe(() => {});
    this.reportService.getLocations().subscribe((stream) => {
      this.locations = stream;
    })
  }

  onSubmit(input:any) {
    console.log(input);

    const filteredLocations:VillainLocation[] = this.locations.filter((l) => {
      return l.getLocation().toLowerCase() === this.inputLocation?.toLowerCase();
    });

    if (filteredLocations.length !== 0) {
      console.log('yup');
      const location:VillainLocation = filteredLocations[0];

      if (location.getCoordinates().x != input.coordX || location.getCoordinates().y != input.coordY) {
        this.errorMessage = 'Error: location name is already used! Choose a different name!';
        return;
      }
    }

    const report:VillainReport = new VillainReport(input.mischief_maker, input.reporter, new Date(), input.location, {x: input.coordX, y: input.coordY}, VillainStatus.Open, input.comments, input.picture);
    const location:VillainLocation = new VillainLocation(input.location, input.coordX, input.coordY);
    
    this.reportService.addReport(report).subscribe(() => {
      this.reportService.addLocation(location).subscribe(() => {
        this.router.navigate(["/"]);
      })
    });
  }

  onInputLocation() {
    const filteredLocations:VillainLocation[] = this.locations.filter((l) => {
      return l.getLocation().toLowerCase() === this.inputLocation?.toLowerCase();
    });

    if (filteredLocations.length === 0) {
      return;
    }

    const definedCoords:{x:number, y:number} = filteredLocations[0].getCoordinates();
    this.setFormCoordinates(definedCoords.x, definedCoords.y);
  }

  onSelectCoordinates(event:any) {
    this.selectedCoordX = event.lat;
    this.selectedCoordY = event.lng;
  }

  onUseCoordinates() {
    if (!this.selectedCoordX || !this.selectedCoordY) return;

    this.setFormCoordinates(this.selectedCoordX, this.selectedCoordY);
  }

  setFormCoordinates(x:number, y:number) {
    this.coordX = x;
    this.coordY = y;
    this.form.get('coordX')?.setValue(x);
    this.form.get('coordY')?.setValue(y);
  }
}
