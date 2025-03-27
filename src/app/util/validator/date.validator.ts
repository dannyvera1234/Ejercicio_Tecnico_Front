import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateNotInThePastValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setDate(currentDate.getDate() - 1);
    const inputDate = new Date(control.value);

    if (inputDate < currentDate) {
      return { DATE_INVALID: true };
    }
    return null;
  };
}
