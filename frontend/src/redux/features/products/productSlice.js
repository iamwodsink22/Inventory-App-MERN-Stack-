import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isloading: false,
  message: "",
  totalStoreValue: 0,
  category: [],
  outOfStock: [],
};
export const createProduct = createAsyncThunk(
  "/products/create",
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAllProduct = createAsyncThunk(
  "/products/getall",
  async (_, thunkAPI) => {
    try {
      return await productService.getProduct();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const delProduct = createAsyncThunk(
  "/products/delete",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAProduct = createAsyncThunk(
  "/products/getone",
  async (id, thunkAPI) => {
    try {
      return await productService.getaProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "/products/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      console.log(id);
      console.log(formData);
      return await productService.updateProduct(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const products = action.payload;
      const array = [];
      products.map((item, index) => {
        const { price, quantity } = item;
        const productValue = price * quantity;
        return array.push(productValue);
      });
      const totalValue = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalStoreValue = totalValue;
    },
    CALC_OUT_STOCK(state, action) {
      const products = action.payload;
      const outStock = products.filter((item) => item.quantity === "0");
      state.outOfStock = outStock;
    },

    CALC_CATEGORIES(state, action) {
      const products = action.payload;
      const array = [];
      products.map((item) => {
        const { category } = item;
        return array.push(category);
      });
      const uniqueCategory = [...new Set(array)];
      state.category = uniqueCategory;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isloading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.products.push(action.payload);
        toast.success("Product added successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isloading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      })
      .addCase(getAllProduct.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.isloading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.products = action.payload;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.isloading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);

        toast.error(action.payload);
      })
      .addCase(delProduct.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(delProduct.fulfilled, (state, action) => {
        state.isloading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product deleted Successfully");
      })
      .addCase(delProduct.rejected, (state, action) => {
        state.isloading = false;
        state.isError = true;
        state.message = action.payload;

        toast.error(action.payload);
      })
      .addCase(getAProduct.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isloading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isloading = false;
        state.isError = true;
        state.message = action.payload;

        toast.error(action.payload);
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isloading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
        toast.success("Product Edited Succesfully");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isloading = false;
        state.isError = true;
        state.message = action.payload;

        toast.error(action.payload);
      });
  },
});

export const { CALC_STORE_VALUE, CALC_OUT_STOCK, CALC_CATEGORIES } =
  productSlice.actions;
export const selectLoading = (state) => state.product.isloading;
export const selectTotalValue = (state) => state.product.totalStoreValue;
export const selectOutStock = (state) => state.product.outOfStock;
export const selectCategory = (state) => state.product.category;
export const selectProduct = (state) => state.product.product;

export default productSlice.reducer;
