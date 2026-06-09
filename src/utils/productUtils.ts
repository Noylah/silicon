import type { Product } from "../constants/defaultData";

export function deleteProductFromList(
  productsList: Product[],
  idToDelete: number,
): Product[] {
  return productsList.filter((product) => product.id !== idToDelete);
}

export function addProductToList(
  productList: Product[],
  newProduct: Omit<Product, "id">,
): Product[] {
  const maxId =
    productList.length > 0 ? Math.max(...productList.map((p) => p.id)) : -1;
  const productWithId: Product = {
    ...newProduct,
    id: maxId + 1,
  };
  return [...productList, productWithId];
}

export function updateProductSpecInList(
  productsList: Product[],
  idToUpdate: number,
  specName: string,
  newValue: number | boolean,
): Product[] {
  return productsList.map((product) => {
    if (product.id !== idToUpdate) return product;
    return {
      ...product,
      specs: {
        ...product.specs,
        [specName]: newValue,
      },
    };
  });
}
