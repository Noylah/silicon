import type { Product, UseCase } from "../constants/defaultData";

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

export function deleteUseCaseFromList(
  useCaseList: UseCase[],
  useCaseId: number,
): UseCase[] {
  return useCaseList.filter((useCase) => useCase.id !== useCaseId);
}

export function addUseCaseToList(
  useCaseList: UseCase[],
  newUseCase: Omit<UseCase, "id">,
): UseCase[] {
  const maxId =
    useCaseList.length > 0 ? Math.max(...useCaseList.map((u) => u.id)) : -1;
  const useCaseWithId: UseCase = {
    ...newUseCase,
    id: maxId + 1,
  };
  return [...useCaseList, useCaseWithId];
}

export function updateUseCaseInList(
  useCaseList: UseCase[],
  idToUpdate: number,
  highlightName: string,
  newValue: "max" | "min" | null,
): UseCase[] {
  return useCaseList.map((useCase) => {
    if (useCase.id !== idToUpdate) return useCase;
    return {
      ...useCase,
      highlights: {
        ...useCase.highlights,
        [highlightName]: newValue,
      },
    };
  });
}
