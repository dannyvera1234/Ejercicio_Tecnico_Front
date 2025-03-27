import { AsyncValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, of, map, catchError } from "rxjs";
import { ProductService } from "../../services";

export function idExistsValidator(productService: ProductService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }


    return productService.VerificationId(control.value).pipe(
      map(exists => {
        return exists ? { ID_EXISTS: true } : null;
      }),
      catchError((error) => {
        return of(null);
      })
    );
  };
}
