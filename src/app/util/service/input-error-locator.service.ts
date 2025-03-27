import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

const DEFAULT_ERRORS = {
  required: () => 'Este campo es requerido!',
  minlength: (error: any) => `Este campo debe tener al menos ${error.requiredLength} caracteres.`,
  maxlength: (error: any) => `Este campo no debe tener más de ${error.requiredLength} caracteres.`,
  minArrayLength: (minArrayLength: any) => `Este campo debe tener al menos ${minArrayLength} elementos.`,
  maxArrayLength: (maxArrayLength: any) => `Este campo no debe tener más de ${maxArrayLength} elementos.`,
  min: (error: any) => `Este campo debe ser al menos ${error.min}.`,
  max: (error: any) => `Este campo no debe ser mayor a ${error.max}.`,
  ID_EXISTS: () => 'El id ya existe.',
  DATE_INVALID : () => 'La fecha debe ser igual o mayor a la fecha actual.',
  DATE_NOT_ONE_YEAR_AFTER: () => 'La Fecha debe ser exactamente un año posterior a la fecha de liberación',
};

@Injectable({
  providedIn: 'platform',
})
export class InputErrorLocatorService {
  public locate(error?: ValidationErrors | undefined | null): string {
    if (!error) return '';

    const message = error['message'];

    if (message) return message;

    for (const entry of Object.entries(DEFAULT_ERRORS)) {
      const [key, value] = entry;
      if (error[key]) return value(error[key]);
    }

    const errorAsMessage = Object.values(error).find((value) => typeof value === 'string');
    if (errorAsMessage) return errorAsMessage;

    throw new Error(`Unknown input error: ${JSON.stringify(error)}`);
  }
}
