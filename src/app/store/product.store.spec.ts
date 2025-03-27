import { ProductService } from '../services';
import { of } from 'rxjs';
import { PRODUCT_INITIAL_STATE } from './product.store';

jest.mock('../services', () => ({
  ProductService: jest.fn().mockImplementation(() => ({
    getProducts: jest.fn().mockReturnValue(of({ data: [{ name: 'Product 1' }] })),
    createProduct: jest.fn().mockReturnValue(of({ data: { name: 'New Product' } })),
    deleteProduct: jest.fn().mockImplementation((id: string) => of({})),
    updateProduct: jest.fn().mockImplementation((id: string, product: any) => of({})),
  })),
}));

jest.mock('@angular/router', () => ({
  Router: jest.fn().mockImplementation(() => ({
    navigate: jest.fn(),
  })),
}));

describe('PRODUCT_INITIAL_STATE', () => {
  let store: any;

  beforeEach(() => {
    store = new PRODUCT_INITIAL_STATE();
  });

  it('should initialize the store with the correct initial state', () => {
    const initialState = store.state();
    expect(initialState).toEqual({
      Listproducts: { data: [] },
      loading: false,
      idProduct: null,
      searchTerm: null,
      itemsPerPage: null,
      modals: {
        addProduct: { isOpen: false },
        deleteProduct: { isOpen: false },
      },
    });
  });

  it('should update idProduct', () => {
    store.idProduct('123');
    expect(store.state().idProduct).toBe('123');
  });

  it('should update searchTerm', () => {
    store.searchTerm('product name');
    expect(store.state().searchTerm).toBe('product name');
  });

  it('should open modal correctly', () => {
    store.openModal('addProduct');
    expect(store.state().modals.addProduct.isOpen).toBe(true);
  });

  it('should close modal correctly', () => {
    store.closeModal('addProduct');
    expect(store.state().modals.addProduct.isOpen).toBe(false);
  });

  it('should filter products correctly', () => {
    store.state().Listproducts = { data: [{ name: 'Product 1' }, { name: 'Product 2' }] };
    store.searchTerm('product 1');
    store.filterProducts();
    expect(store.state().Listproducts.data.length).toBe(1);
    expect(store.state().Listproducts.data[0].name).toBe('Product 1');
  });

  it('should call ProductService to fetch all products', () => {
    const productService = new ProductService(null as any);
    (productService.getProducts as jest.Mock).mockReturnValue(of({ data: [{ name: 'Product 1' }] }));

    store.allProducts();

    expect(productService.getProducts).toHaveBeenCalled();
    expect(store.state().Listproducts.data.length).toBe(1);
    expect(store.state().Listproducts.data[0].name).toBe('Product 1');
  });

  it('should call ProductService to create a product', () => {
    const productService = new ProductService(null as any);
    const product = { value: { name: 'New Product' } };
    (productService.createProduct as jest.Mock).mockReturnValue(of({ data: { name: 'New Product' } }));

    store.createProduct(product);

    expect(productService.createProduct).toHaveBeenCalledWith(product.value);
    expect(store.state().Listproducts.data.length).toBe(1);
    expect(store.state().Listproducts.data[0].name).toBe('New Product');
  });

  it('should call ProductService to delete a product', () => {
    const productService = new ProductService(null as any);
    store.state().Listproducts = { data: [{ id: '1', name: 'Product 1' }] };
    store.idProduct('1');
    (productService.deleteProduct as jest.Mock).mockReturnValue(of({}));

    store.deleteEmpleado();

    expect(productService.deleteProduct).toHaveBeenCalledWith('1');
    expect(store.state().Listproducts.data.length).toBe(0);
  });

  it('should call ProductService to update a product', () => {
    const productService = new ProductService(null as any);
    const updatedProduct = { value: { name: 'Updated Product' } };
    (productService.updateProduct as jest.Mock).mockReturnValue(of({}));

    store.updateProduct('1', updatedProduct);

    expect(productService.updateProduct).toHaveBeenCalledWith('1', updatedProduct.value);
  });
});
