import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-villain-form',
  templateUrl: './villain-form.component.html',
  styleUrl: './villain-form.component.css'
})
export class VillainFormComponent {
  form: FormGroup;
  constructor() {
    const formControls = {
      reporter: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      mischief_maker: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      picture: new FormControl('', [Validators.required]),
      comments: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    }

    this.form = new FormGroup(formControls)
  }

  onSubmit() {
    console.log("Submitted");
  }
}
