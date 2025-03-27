import { computed, inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateNotInThePastValidator, dateExactlyOneYearAfterValidator, idExistsValidator } from '../../../util';
import { ProductService } from '../../../services';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService  {
  private _fb = inject(FormBuilder);
  private _productService = inject(ProductService);
  public addProductForm!: FormGroup;

  public readonly minDate = computed(() => new Date().toISOString().split('T')[0]);
  constructor() {
    this.addProductForm = this._fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]
    , [idExistsValidator(this._productService)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required, dateNotInThePastValidator()]],
      date_revision: ['', [Validators.required]],
    });

     // Escuchar cambios en la fecha de liberación
    this.addProductForm.get('date_release')?.valueChanges.subscribe((releaseDate) => {
      if (releaseDate) {
        // Establecer la fecha de revisión automáticamente a un año después de la fecha de liberación
        const releaseDateObj = new Date(releaseDate);
        releaseDateObj.setFullYear(releaseDateObj.getFullYear() + 1);
        const revisionDate = releaseDateObj.toISOString().split('T')[0]; // Convertir a formato ISO de solo fecha

        // Establecer el valor de date_revision
        this.addProductForm.get('date_revision')?.setValue(revisionDate);

        // Agregar el validador dinámico para asegurar que la fecha de revisión sea exactamente un año después
        const releaseDateControl = this.addProductForm.get('date_release');
        const revisionDateControl = this.addProductForm.get('date_revision');
        if (releaseDateControl?.value) {
          revisionDateControl?.setValidators([
            Validators.required,
            dateExactlyOneYearAfterValidator(releaseDateControl),
          ]);
          revisionDateControl?.updateValueAndValidity();
        }
      }
    });
  }

  public resetForm() {
    this.addProductForm.reset();
  }

}
