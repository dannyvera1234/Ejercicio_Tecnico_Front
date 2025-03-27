import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { finalize, mergeMap, of } from "rxjs";
import { ProductService } from "../services";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export interface ModalState {
  isOpen: boolean;
  idProduct?: string;
}

export interface ProductState {
  Listproducts: any;
  loading: boolean;
  idProduct: string | null;
  modals: Record<string, ModalState>;
  searchTerm: string | null,
  itemsPerPage: number | null
}


const initialState: ProductState = {
  Listproducts: [],
  loading: false,
  idProduct: null,
  searchTerm: null,
  itemsPerPage: null,
  modals: {
    addProduct: {
      isOpen: false,
    },
    deleteProduct: {
      isOpen: false
    }
  }
};

export const PRODUCT_INITIAL_STATE = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store) => {
    const productService = inject(ProductService);
    const router = inject(Router);
    return {
      idProduct: (ide: string) => { patchState(store, { idProduct: ide }) },

      searchTerm: (term: string) => { patchState(store, { searchTerm: term }) },

      openModal: (modalName: string) => {
        patchState(store, {
          modals: {
            ...store.modals(),
            [modalName]: { isOpen: true },
          },
        });
      },

      closeModal: (modalName: string) => {
        patchState(store, {
          modals: {
            ...store.modals(),
            [modalName]: { isOpen: false },
          },
        });
      },

      isModalOpen: (modalName: string) => {
        return store.modals()[modalName]?.isOpen || false;
      },

      allProducts() {

        of(patchState(store, { loading: true })).pipe(
          mergeMap(() => productService.getProducts()),
          finalize(() => patchState(store, { loading: false }))
        ).subscribe((data) => {
          patchState(store, { Listproducts: data });
        })
      },

      createProduct(product: any) {
        patchState(store, { loading: true });
        productService.createProduct(product.value).pipe(
          finalize(() => patchState(store, { loading: false }))
        ).subscribe((resp: any) => {
          patchState(store, { modals: { ...store.modals(), addModal: { isOpen: false } } });
          patchState(store, { Listproducts: { data: [...store.Listproducts().data, resp.data] }, });
          product.reset();
        });
      },

      deleteEmpleado: () => {
        of(patchState(store, { loading: true }))
          .pipe(
            mergeMap(() => productService.deleteProduct(store.idProduct()!)),
            finalize(() => {
              patchState(store, { loading: false });
            })
          )
          .subscribe((resp) => {
            const currentProduct = store.Listproducts();
            if (!currentProduct?.data) return;
            const deleteProduct = currentProduct.data.filter((product: any) => product.id !== store.idProduct());
            patchState(store, { modals: { ...store.modals(), deleteProduct: { isOpen: false } } });
            patchState(store, {
              Listproducts: { data: deleteProduct },
            });
          });
      },

      updateProduct(id: string, product: any) {
        of(patchState(store, { loading: true }))
          .pipe(
            mergeMap(() => productService.updateProduct(id, product)),
            finalize(() => {
              patchState(store, { loading: false });
            })
          )
          .subscribe((resp) => {
            router.navigate(['/product']);
          });
      },

      filterProducts() {
        const searchTerm = store.searchTerm()!.trim().toLowerCase();
        const allProducts = store.Listproducts()?.data;
        if (searchTerm === '') {
          this.allProducts();
        } else {
          const filtered = allProducts.filter((product: any) =>
            product.name.toLowerCase().includes(searchTerm)
          );
          patchState(store, { Listproducts: { data: filtered } });
        }
      }


    }
  }
  ),

);
