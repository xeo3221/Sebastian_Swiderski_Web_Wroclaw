export interface Product {
  id: number;
  name: string;
  price: {
    main: number;
    fractional: number;
  };
}

export interface ProductsResponse {
  products: Product[];
}
