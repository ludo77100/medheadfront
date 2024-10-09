import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HospitalService } from '../services/hospital.service';

@Component({
  selector: 'app-new-emergency',
  templateUrl: './new-emergency.component.html',
  styleUrls: ['./new-emergency.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class NewEmergencyComponent implements OnInit {
  form: FormGroup;
  specialityGroups: any[] = [];
  specialities: any[] = [];
  selectedHospitalName: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private hospitalService: HospitalService) {
    this.form = this.fb.group({
      userLat: [''],
      userLon: [''],
      specialityGroupId: [''],
      specialityId: ['']
    });
  }

  ngOnInit(): void {
    this.hospitalService.getAllSpecialityGroupWithChildren().subscribe((data) => {
      this.specialityGroups = data;
    });
  }


}