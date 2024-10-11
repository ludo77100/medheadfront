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
  closestHospitalListSize: number | null = null;
  closestHospitalList: any[] = [];

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
    const selectedGroup = this.specialityGroups.find(group => group.specialityGroupId == selectedValue);
    this.specialities = selectedGroup ? selectedGroup.speciality : [];
  }

  ngOnInit(): void {
    this.hospitalService.getAllSpecialityGroupWithChildren().subscribe((data) => {
      this.specialityGroups = data;
    });
  }


  onSubmit(): void {
    this.closestHospitalListSize = null ;
    const { userLat, userLon, specialityId } = this.form.value;
    this.hospitalService.getClosestHospital(userLat, userLon, specialityId).subscribe((response: any) => {
    this.closestHospitalList = response;
    this.closestHospitalListSize = this.closestHospitalList.length;
      
    });
  }
}