import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCT(state, action) {
      const { product, search } = action.payload;
      if (search) {
        const tempProducts = product.filter((item) => {
          return (
            item.name.toLowerCase().includes(search?.toLowerCase()) ||
            item.category.toLowerCase().includes(search?.toLowerCase())
          );
        });
        state.filteredProducts = tempProducts;
      } else {
        state.filteredProducts = product;
      }
    },
  },
});

export const { FILTER_PRODUCT } = filterSlice.actions;
export const filterproducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
