import { queryHelper } from "../base";

export const fetchProducts = (page = 1, options = {}) => {
  const pageNumber = page === "" ? 1 : parseInt(page, 10) || 1;

  const { category, minPrice, maxPrice, brand, limit = 10 } = options;

  const queryParams = new URLSearchParams({
    page: pageNumber.toString(),
    limit: limit.toString(),
    ...(category && { category }),
    ...(brand && { brand }),
    ...(minPrice && { minPrice: minPrice.toString() }),
    ...(maxPrice && { maxPrice: maxPrice.toString() }),
  });

  const url = `/user/product?${queryParams.toString()}`;

  return queryHelper(url, [
    "products",
    pageNumber,
    category,
    minPrice,
    maxPrice,
    brand,
  ]);
};

export const fetchOneProduct = (id) =>
  queryHelper(`/user/product/${id}`, ["product", id]);
