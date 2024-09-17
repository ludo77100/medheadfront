import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class PatientFormComponent {
  patientForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      idCardNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      nationality: ['', Validators.required],
      streetAddress: ['', Validators.required],
      complementaryAddress: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      console.log(this.patientForm.value);
      //Logique de transmission ici
    }
  }
}