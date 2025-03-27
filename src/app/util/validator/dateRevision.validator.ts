import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateExactlyOneYearAfterValidator(controlReleaseDate: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const releaseDate = new Date(controlReleaseDate.value); // Fecha de liberación
    const revisionDate = new Date(control.value); // Fecha de revisión

    // Sumar 1 año a la fecha de liberación sin crear una nueva instancia
    releaseDate.setFullYear(releaseDate.getFullYear() + 1);



    // Comparar las fechas
    if (revisionDate.getTime() !== releaseDate.getTime()) {
      return { DATE_NOT_ONE_YEAR_AFTER: true };
    }

    return null; // Si la fecha es exactamente un año después
  };
}
