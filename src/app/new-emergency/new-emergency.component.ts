import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HospitalService } from '../services/hospital.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Subject, takeUntil, tap, throwError } from 'rxjs';

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
  bedBooked: boolean | undefined;

  form: FormGroup;
  isLoading = false;
  errorMessage: String | undefined ;

  private destroy$ = new Subject<void>();


  constructor(private fb: FormBuilder, private hospitalService: HospitalService, private http: HttpClient) {
    this.form = this.fb.group({
      userLat: [''],
      userLon: [''],
      specialityGroupId: [''],
      specialityId: ['']
    });
  }

  /**
   * Met à jour la liste des spécialités en fonction du groupe sélectionné
   * 
   * @param event  L'événement de changement de la sélection
   */
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


  /**
   * Soumet le formulaire pour rechercher l'hôpital le plus proche
   * 
   * Réinitialise l'état de la liste des hôpitaux et active le chargement
   * Envoie les données (latitude, longitude, spécialité) au service
   * Met à jour la liste des hôpitaux les plus proches une fois la réponse reçue
   */
  onSubmit(): void {

    this.closestHospitalListSize = null ;
    this.isLoading = true;
    const { userLat, userLon, specialityId } = this.form.value;

    this.hospitalService.getClosestHospital(userLat, userLon, specialityId).subscribe((response: any) => {
      this.isLoading = false;
      this.closestHospitalList = response;
    this.closestHospitalListSize = this.closestHospitalList.length;
    });
  }

  /**
   * Réserve un lit à partir de son ID
   * 
   * Envoie une requête pour changer l'état du lit
   * Met à jour l'état de la réservation en fonction de la réponse ou de l'erreur
   * 
   * @param bedId  L'identifiant du lit à réserver
   */
  bookBed(bedId: number): void {
    console.log('Requête en cours de réservation de lit avec ID:', bedId);
    this.hospitalService.changeBedState(bedId)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          console.log('Le lit a été réservé avec succès');
          this.bedBooked = true;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('Erreur lors de la tentative de réservation de lit:', error);
          if (error.status === 404) {
            console.error("Lit non trouvé, veuillez vérifier l'ID");
            this.errorMessage = "Lit non trouvé, veuillez vérifier l'ID" ;
            this.bedBooked = false;
          } else {
            console.error("Une erreur s'est produite :", error.message);
            this.errorMessage = "Une erreur s'est produite" ;
            this.bedBooked = false;
          }
          return throwError(() => new Error(error.message));
        })
      )
      .subscribe({
        complete: () => console.log('Opération de réservation terminée')
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}