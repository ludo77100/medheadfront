import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HospitalService } from '../services/hospital.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-emergency',
  templateUrl: './new-emergency.component.html',
  styleUrls: ['./new-emergency.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
    ]
})
export class NewEmergencyComponent implements OnInit {
  specialityGroups: any[] = [];
  specialities: any[] = [];
  selectedHospitalName: string | null = null;

  form: FormGroup;

  constructor(private fb: FormBuilder, private hospitalService: HospitalService, private http: HttpClient) {
    this.form = this.fb.group({
      userLat: [''],
      userLon: [''],
      specialityGroupId: [''],
      specialityId: ['']
    });
  }

  onSpecialityGroupChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log(selectedValue);
    const selectedGroup = this.specialityGroups.find(group => group.specialityGroupId == selectedValue);
    this.specialities = selectedGroup ? selectedGroup.speciality : [];
  }

  ngOnInit(): void {
    this.hospitalService.getAllSpecialityGroupWithChildren().subscribe((data) => {
      this.specialityGroups = data;
    });
  }


  onSubmit(): void {
    const { userLat, userLon, specialityId } = this.form.value;
    this.http.get(`http://localhost:8082/hospital/closest`, {
      params: {
        userLatStr: userLat,
        userLonStr: userLon,
        specialityId: specialityId
      }
    }).subscribe((response: any) => {
      this.selectedHospitalName = response.hospitalName;
    });
  }
}